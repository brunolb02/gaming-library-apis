import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GamespotService } from '../gamespot/gamespot.service';

@Injectable()
export class GamesService {
  constructor(
    private readonly gamespotService: GamespotService,
    private configService: ConfigService,
  ) {}

  async search(name: string) {
    const a = await this.gamespotService.fetchGamesFromGamespotAPI(name);
    console.log(
      '🚀 ~ file: games.service.ts:14 ~ GamesService ~ search ~ a:',
      a,
    );

    return a;
  }
}
