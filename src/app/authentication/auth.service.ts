/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/providers#services
*/

import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { RegisterDto, Role } from "./auth.dto";
import { User } from "../../entity/user";
import { Player } from "../../entity/player";
import AppDataSource from "../../typeOrm";
import * as bcrypt from "bcrypt";
import { Admins} from "src/entity/admin";
import * as crypto from "crypto";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly mailerService: MailerService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await AppDataSource.getRepository(User).findOneBy({ email: email });
    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException("Invalid credentials");
    }

    return user
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

//
  async register(data: RegisterDto) {
    const alreadyExistsUser = await AppDataSource.getRepository(User).findOneBy({email: data.email})

    if (alreadyExistsUser) {
      throw new BadRequestException("User all redey exist");
    }

    const newUser = new User()
    newUser.email = data.email
    newUser.firstName = data.firstName
    newUser.lastName = data.lastName
    newUser.phone = data.phone
    newUser.role = data.role
    newUser.isActive = true
    newUser.password = bcrypt.hashSync(data.password, 10)
    newUser.status = 'Approve'

    await AppDataSource.getRepository(User).save(newUser)

    if (data.role === Role.Admin) {
      const newAdmin = new Admins()
      newAdmin.address = data.address
      newAdmin.id = newUser.id

      await AppDataSource.getRepository(Admins).save(newAdmin)
    } else {
      const newPlayer = new Player()
      newPlayer.club = data.club;
      newPlayer.dateOfBirth = data.dateOfBirth;
      newPlayer.height = data.height
      newPlayer.school = data.school
      newPlayer.id = newUser.id;

      await AppDataSource.getRepository(Player).save(newPlayer)
    }
  }

  async forgotPasswordVerifyEmail(email: string) {
    const user = await AppDataSource.getRepository(User).findOneBy({email: email})
    if (!user) {
      throw new NotFoundException("User not found")
    }

    const code = crypto.randomInt(12345, 99999).toString();
    user.fgToken = code
    await AppDataSource.getRepository(User).save(user)

    console.log(code);
    

    // send mail
    await this.mailerService.sendMail({
      to: email,
      from: 'aju@gmail.com',
      subject: 'Forgot Password',
      template: 'forgot-password',
      context: {
        payload: {
          code
        }
      }
    });
  }

  async forgotPasswordVerifyCode(code: string) {
    const user = await AppDataSource.getRepository(User).findOneBy({fgToken: code})
    if (!user) {
      throw new NotFoundException("Code not found")
    }

    // return new jwt token
    const payload = { sub: user.id, type: 'password-reset' };
    return {
      access_token: this.jwtService.sign(payload),
    }
  }

  async forgotPasswordResetPassword(password: string, token: string) {
    // parse jwt token
    const decoded = this.jwtService.decode(token)
    if (!decoded || (decoded as { type: string }).type !== 'password-reset') {
      throw new BadRequestException("Invalid token")
    }

    const user = await AppDataSource.getRepository(User).findOneBy({id: (decoded as { sub: number }).sub})
    if (!user) {
      throw new NotFoundException("User not found")
    }

    // update password
    user.password = bcrypt.hashSync(password, 10)
    await AppDataSource.getRepository(User).save(user)
  }
}
