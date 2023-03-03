/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Post, UseGuards } from '@nestjs/common';
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return req.user;
  }
}
