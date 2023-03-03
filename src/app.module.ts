import { AdminModule } from './app/admin/admin.module';
import { NotificationModule } from './app/gateway/notification.module';
import { PlayerModule } from './app/player/player.module';
import { LeagueModule } from './app/league/league.module';

import { AuthModule } from './app/authentication/auth.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    AdminModule,
    NotificationModule,
    PlayerModule,
    LeagueModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
