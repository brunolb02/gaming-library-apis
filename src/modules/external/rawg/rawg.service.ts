import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class RawgService {
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async fetchMetacriticScoreByNameFromRawgAPI(
    gameName: string,
  ): Promise<number> {
    try {
      const gameSlug = this.slugify(gameName);

      const metacriticScoreFromRawg = await lastValueFrom(
        this.httpService
          .get(
            `/api/games/${gameSlug}?key=${this.configService.getOrThrow(
              'RAWG_API_KEY',
            )}`,
          )
          .pipe(
            map((response) => {
              const metacriticScore = response.data?.metacritic || 0;
              return metacriticScore;
            }),
          ),
      );

      return metacriticScoreFromRawg;
    } catch (error) {
      throw error;
    }
  }

  private slugify(str: string): string {
    const slug = str
      .replace(/[^\w\s-]/g, '')
      .trim()
      .toLowerCase();

    return slug.replace(/\s+/g, '-');
  }
}
