import { Module } from '@nestjs/common';
import { CompletedGamesService } from './completed-games.service';
import { CompletedGamesController } from './completed-games.controller';
import { GamesModule } from '../games/games.module';

@Module({
  imports: [GamesModule],
  controllers: [CompletedGamesController],
  providers: [CompletedGamesService],
  exports: [CompletedGamesService],
})
export class CompletedGamesModule {}
