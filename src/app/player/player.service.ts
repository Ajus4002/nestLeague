/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import * as moment from "moment";
import { LeagueApplication } from 'src/entity/leagueapplication';
import { Player } from 'src/entity/player';
import { League } from 'src/entity/league';
import AppDataSource from 'src/typeOrm';

@Injectable()
export class PlayerService {


    async  leagueApplication(leagueId:number, userId:number) {
        const count = await AppDataSource.getRepository(LeagueApplication ).count({where:{  league_id:leagueId }});
        if (count > 10) {
          throw new Error("Only 10 members can apply");
        }
      
        const isJoined = await AppDataSource.getRepository(LeagueApplication ).findOneBy({
         league_id:leagueId,
         user_id:userId
        });
        const league = await AppDataSource.getRepository(League).findOneBy({ id:leagueId  });
        if (!league) {
          throw new Error("League not found");
        }
      
        if (isJoined) {
          throw new Error(" You have already joined this league");
        }
      
        if (moment(league.date).subtract(3, "day").isAfter(moment())) {
          throw new Error(" You cant apply");
        }
      
        await AppDataSource.getRepository(LeagueApplication ) .create({ league_id: leagueId, user_id: userId });
      }
      
}
