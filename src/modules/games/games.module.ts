import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { GamespotModule } from '../external/gamespot/gamespot.module';
import { RawgModule } from '../external/rawg/rawg.module';
import { HowLongToBeatService } from 'howlongtobeat';

@Module({
  imports: [GamespotModule, RawgModule],
  controllers: [GamesController],
  providers: [GamesService, HowLongToBeatService],
  exports: [GamesService],
})
export class GamesModule {}
