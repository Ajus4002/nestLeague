/* eslint-disable prettier/prettier */
import { Controller,Body, Request, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './localauthguard.guard';
import { AuthService } from './auth.service';
import { ForgetDto, LoginDto, RegisterDto, ResetDto, VerifyDto } from "./auth.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { ApiImplicitBody } from "@nestjs/swagger/dist/decorators/api-implicit-body.decorator";
import { AuthGuard } from "@nestjs/passport";

@Controller()
@ApiTags('Authentication')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  @ApiOperation({ summary: 'Login' })
  @ApiImplicitBody({ content: undefined, name: 'Login', description: 'Login', type: LoginDto })
  async login(@Request() req) {
    return this.authService.login(req.user)
  }

  @Post('auth/register')
  @ApiOperation({ summary: 'Register' })
  async register(@Body() data: RegisterDto) {
    return this.authService.register(data)
  }

  @Post('auth/forgot-password/verify-email')
  @ApiOperation({ summary: 'Forgot Password Verify Email' })
  async verifyEmail(@Body()body: ForgetDto) {
    return this.authService.forgotPasswordVerifyEmail(body.email)
  }

  @Post('auth/forgot-password/verify-code')
  @ApiOperation({ summary: 'Forgot Password Verify Code' })
  async verifyCode(@Body() code: VerifyDto) {
    return this.authService.forgotPasswordVerifyCode(code.code)
  }

  @Post('auth/forgot-password/reset-password')
  @ApiOperation({ summary: 'Forgot Password Reset Password' })
  async resetPassword( @Body() token: ResetDto) {
    return this.authService.forgotPasswordResetPassword(token.password, token.token)
  }
}
