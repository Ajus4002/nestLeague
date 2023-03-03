/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post, Put, Param, Get } from '@nestjs/common';
import { leagueDto } from './league.dto';
import { LeagueService } from './league.service';
import { ApiOperation, ApiTags } from "@nestjs/swagger";
@Controller()
export class LeagueController {
  constructor(private leagueService: LeagueService) {}
  @ApiOperation({ summary: 'Add league' })
  @Post('/addleagueb')
  async add(@Body() league: leagueDto) {
    return this.leagueService.add(league);
  }
  @Put('/updateleague/:id')
  @ApiOperation({ summary: 'Update league' })
  async update(@Body() league: leagueDto, @Param('id') id: number) {
    return this.leagueService.update(id, league);
  }

  @Get('/league/:id')
  @ApiOperation({ summary: 'Get league' })
  async get(@Param('id') id) {
    return this.leagueService.get(id);
  }
}
