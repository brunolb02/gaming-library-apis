import { Module } from '@nestjs/common';
import { CompletedGamesService } from './completed-games.service';
import { CompletedGamesController } from './completed-games.controller';

@Module({
  controllers: [CompletedGamesController],
  providers: [CompletedGamesService],
})
export class CompletedGamesModule {}
