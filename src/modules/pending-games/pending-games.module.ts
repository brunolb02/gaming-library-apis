import { Module } from '@nestjs/common';
import { PendingGamesService } from './pending-games.service';
import { PendingGamesController } from './pending-games.controller';

@Module({
  controllers: [PendingGamesController],
  providers: [PendingGamesService],
})
export class PendingGamesModule {}
