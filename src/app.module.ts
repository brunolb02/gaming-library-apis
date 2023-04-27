import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { CompletedGamesModule } from './modules/completed-games/completed-games.module';
import { GamesModule } from './modules/games/games.module';
import { PendingGamesModule } from './modules/pending-games/pending-games.module';
import { PlayingGamesModule } from './modules/playing-games/playing-games.module';
import appConfig from './app.config';
import logger from './app.logger';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { GamespotModule } from './modules/external/gamespot/gamespot.module';
import { RawgModule } from './modules/external/rawg/rawg.module';

@Module({
  imports: [
    appConfig,
    logger,
    PrismaModule,
    AuthModule,
    CompletedGamesModule,
    GamesModule,
    PendingGamesModule,
    PlayingGamesModule,
    UsersModule,
    GamespotModule,
    RawgModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
