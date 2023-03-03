/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { Admins } from 'src/entity/admin';
import { adminDto, Role } from './admin.dto';
import AppDataSource from '../../typeOrm';
import { User } from 'src/entity/user';
import * as bcrypt from "bcrypt";
@Injectable()
export class AdminService {

 

    async add(admin: adminDto) {

        const user = new User()
      
        user.firstName = admin.firstName;
        user.lastName = admin.lastName;
        user.email = admin.email;
        user.password = bcrypt.hashSync(admin.password, 10);
        user.role = Role.Admin
        user.status = "Approve"
        user.isActive = true

        AppDataSource.getRepository(User).save(user);
        const adm = new Admins();
        adm.address = admin.  address;
        adm.user = user
        AppDataSource.getRepository(Admins).save(adm);
       
        
      }
}
