import { Module } from '@nestjs/common';
import { PendingGamesService } from './pending-games.service';
import { PendingGamesController } from './pending-games.controller';
import { GamesModule } from '../games/games.module';
import { PlayingGamesModule } from '../playing-games/playing-games.module';

@Module({
  imports: [GamesModule, PlayingGamesModule],
  controllers: [PendingGamesController],
  providers: [PendingGamesService],
  exports: [PendingGamesService],
})
export class PendingGamesModule {}
