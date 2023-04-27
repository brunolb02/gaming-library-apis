import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { IGamesFromGamespot } from 'src/common/interfaces/games-from-gamespot.interface';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class GamespotService {
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async fetchGamesListFromGamespotAPI(
    name: string,
  ): Promise<IGamesFromGamespot[]> {
    try {
      const gamesFromGamespot = await lastValueFrom(
        this.httpService
          .get(
            `/api/games/?api_key=${this.configService.getOrThrow(
              'GAMESPOT_API_KEY',
            )}&format=json&filter=name:${name}`,
          )
          .pipe(
            map((response) => {
              const games = response.data.results.map((game) => {
                return {
                  id: game.id,
                  name: game.name,
                  description: game.description,
                  releaseDate: game.release_date,
                  imageUrl: game.image.original,
                };
              });

              return games;
            }),
          ),
      );

      return gamesFromGamespot;
    } catch (error) {
      throw error;
    }
  }

  async fetchGameFromGamespotAPI(gameId: number): Promise<IGamesFromGamespot> {
    try {
      const gameFromGamespot = await lastValueFrom(
        this.httpService
          .get(
            `/api/games/?api_key=${this.configService.getOrThrow(
              'GAMESPOT_API_KEY',
            )}&format=json&filter=id:${gameId}`,
          )
          .pipe(
            map((response) => {
              const game = response.data.results[0];
              return {
                id: game.id,
                name: game.name,
                description: game.description,
                releaseDate: game.release_date,
                imageUrl: game.image.original,
              };
            }),
          ),
      );

      return gameFromGamespot;
    } catch (error) {
      throw error;
    }
  }
}
