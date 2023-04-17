import { Module } from '@nestjs/common';
import { PlayingGamesService } from './playing-games.service';
import { PlayingGamesController } from './playing-games.controller';

@Module({
  controllers: [PlayingGamesController],
  providers: [PlayingGamesService],
})
export class PlayingGamesModule {}
