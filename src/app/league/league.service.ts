/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { leagueDto } from './league.dto';
import { League } from '../../entity/league';
import AppDataSource from '../../typeOrm';
import { NotificationGateway } from '../gateway/notification.gateway';
import { Notification } from 'src/entity/notification';

import { json } from 'sequelize';

@Injectable()
export class LeagueService {
  constructor(private notificationGateway:NotificationGateway){}
  async add(league: leagueDto) {
    const lea = new League();
    lea.name = league.name;
    lea.date = league.date;
    lea.timing = league.timing;
    lea.details = league.details;
    lea.status = 'Approve';
    lea.isActive = true;
    AppDataSource.getRepository(League).save(lea);
    this.notificationGateway.server.emit("notification",JSON.stringify({
      'title':'league add',
      'message':'league added successfully'
    }))
    const notification = new Notification();
    notification.title = 'League Add';
    notification.message = 'league added successfully';
    AppDataSource.getRepository(Notification).save(notification);
  }

  async update(id, league: leagueDto) {
    const lea = await AppDataSource.getRepository(League).findOneBy({ id });
    if (!lea) {
      throw new Error('league is not found');
    }
    lea.name = league.name;
    lea.date = league.date;
    lea.timing = league.timing;
    AppDataSource.getRepository(League).save(lea);
  }
  async get(id) {
    const lea = await AppDataSource.getRepository(League).findOneBy({ id });
    if (!lea) {
      throw new Error('league is not found');
    }

    return lea;
  }
}
