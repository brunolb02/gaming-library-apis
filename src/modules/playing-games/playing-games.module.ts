import { Module } from '@nestjs/common';
import { PlayingGamesService } from './playing-games.service';
import { PlayingGamesController } from './playing-games.controller';
import { GamesModule } from '../games/games.module';

@Module({
  imports: [GamesModule],
  controllers: [PlayingGamesController],
  providers: [PlayingGamesService],
})
export class PlayingGamesModule {}
