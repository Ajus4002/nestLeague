/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller ,Post ,Request, UseGuards} from '@nestjs/common';
import { PlayerService } from './player.service';
import { playerDto } from './player.dto';
import { JwtAuthGuard } from '../authentication/jwtauthguard.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
@Controller()
export class PlayerController {
constructor (private playerService:PlayerService){}
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Post('/leagueApplication')
    async  LeagueApplication(@Body() player:playerDto,@Request() req) {
        await this.playerService.leagueApplication(
            player.league_ID,req.user.id
     
         
        );
      }
      
}
