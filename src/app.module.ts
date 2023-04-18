import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { CompletedGamesModule } from './modules/auth/completed-games/completed-games.module';
import { GamesModule } from './modules/games/games.module';
import { PendingGamesModule } from './modules/pending-games/pending-games.module';
import { PlayingGamesModule } from './modules/playing-games/playing-games.module';
import appConfig from './app.config';
import logger from './app.logger';
import { PrismaModule } from './modules/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    appConfig,
    logger,
    PrismaModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET_KEY'),
          signOptions: {
            expiresIn: config.get<string>('JWT_EXPIRATION_TIME'),
          },
        };
      },
      inject: [ConfigService],
    }),
    AuthModule,
    CompletedGamesModule,
    GamesModule,
    PendingGamesModule,
    PlayingGamesModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
