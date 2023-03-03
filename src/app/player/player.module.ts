/* eslint-disable prettier/prettier */
import { PlayerService } from './player.service';
import { PlayerController } from './player.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [PlayerController],
  providers: [PlayerService],
})
export class PlayerModule {}
