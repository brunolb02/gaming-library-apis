import { Module } from '@nestjs/common';
import { PlayingGamesService } from './playing-games.service';
import { PlayingGamesController } from './playing-games.controller';
import { GamesModule } from '../games/games.module';
import { CompletedGamesModule } from '../completed-games/completed-games.module';

@Module({
  imports: [GamesModule, CompletedGamesModule],
  controllers: [PlayingGamesController],
  providers: [PlayingGamesService],
  exports: [PlayingGamesService],
})
export class PlayingGamesModule {}
