import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { GamespotModule } from '../gamespot/gamespot.module';

@Module({
  imports: [GamespotModule],
  controllers: [GamesController],
  providers: [GamesService],
})
export class GamesModule {}
