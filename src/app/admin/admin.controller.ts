/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { adminDto } from './admin.dto';


@Controller()
export class AdminController {
    constructor(private AdminService: AdminService) {}
    @Post('/addaddmin')
    async add(@Body()  admin: adminDto) {
      return this.AdminService.add(admin);
    }
}
