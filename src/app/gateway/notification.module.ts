/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { NotificationGateway } from './notification.gateway'

@Module({
  imports: [],
  controllers: [],
  providers: [NotificationGateway ],
  exports:[NotificationGateway]
})
export class NotificationModule {}
