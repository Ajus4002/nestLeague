/* eslint-disable prettier/prettier */
import { LeagueService } from './league.service';
import { LeagueController } from './league.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { NotificationModule } from '../gateway/notification.module';

@Module({
  imports: [NotificationModule],
  controllers: [LeagueController],
  providers: [LeagueService],
})
export class LeagueModule {}
