import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GamespotService } from '../external/gamespot/gamespot.service';
import { ListGamesDTO } from './dto/list-games.dto';
import { RawgService } from '../external/rawg/rawg.service';
import { GameDTO } from './dto/game.dto';
import { HowLongToBeatService } from 'howlongtobeat';
import { TimeToBeatAndPlatformsDTO } from './dto/time-to-beat-and-platforms.dto';

@Injectable()
export class GamesService {
  constructor(
    private readonly gamespotService: GamespotService,
    private readonly rawgService: RawgService,
    private readonly hltbService: HowLongToBeatService,
    private configService: ConfigService,
  ) {}

  async search(name: string, page = 1, limit = 50): Promise<ListGamesDTO> {
    const gamesFromGamespot =
      await this.gamespotService.fetchGamesListFromGamespotAPI(name);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const totalElements = gamesFromGamespot.length;
    const elementsPerPage = limit;
    const totalPages = Math.ceil(totalElements / elementsPerPage);
    const currentPage = page;

    const listGamesContent = gamesFromGamespot.slice(startIndex, endIndex);

    return new ListGamesDTO(
      listGamesContent,
      totalElements,
      elementsPerPage,
      totalPages,
      currentPage,
    );
  }

  async searchSpecific(gamespotId: number): Promise<GameDTO> {
    const { name, description, releaseDate, imageUrl } =
      await this.gamespotService.fetchGameFromGamespotAPI(gamespotId);

    const metacriticScoreFromRawg =
      (await this.rawgService.fetchMetacriticScoreByNameFromRawgAPI(name)) || 0;

    return {
      gamespotId,
      name,
      description,
      releaseDate,
      imageUrl,
      metacriticScore: metacriticScoreFromRawg,
    };
  }

  async searchTimeToBeatAndPlatforms(
    name: string,
  ): Promise<TimeToBeatAndPlatformsDTO> {
    const hltbList = await this.hltbService.search(name);
    const game = hltbList[0];

    return {
      gameplayMain: game?.gameplayMain,
      gameplayMainExtra: game?.gameplayMainExtra,
      gameplayCompletionist: game?.gameplayCompletionist,
      platforms: game?.playableOn,
    };
  }
}
