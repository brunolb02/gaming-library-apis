import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AddPlayingGameDTO } from './dto/add-playing-game.dto';
import { GamesService } from '../games/games.service';
import { PrismaService } from '../prisma/prisma.service';
import { CompletedGames, PlayingGames, Prisma } from '@prisma/client';
import { ListGamesDTO } from '../games/dto/list-games.dto';
import { UpdatePlayingGameDTO } from './dto/update-playing-game.dto';
import { AddCompletedGameDTO } from '../completed-games/dto/add-completed-game.dto';
import { CompletedGamesService } from '../completed-games/completed-games.service';

@Injectable()
export class PlayingGamesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly gamesService: GamesService,
    private readonly completedGamesService: CompletedGamesService,
  ) {}

  async add(
    userId: number,
    addPlayingGameDTO: AddPlayingGameDTO,
  ): Promise<PlayingGames> {
    const game = await this.gamesService.searchSpecific(
      addPlayingGameDTO.gamespotId,
    );

    if (!game) {
      throw new HttpException('game_not_found', HttpStatus.NOT_FOUND);
    }

    const {
      gameplayMain,
      gameplayMainExtra,
      gameplayCompletionist,
      platforms,
    } = await this.gamesService.searchTimeToBeatAndPlatforms(game.name);

    return await this.prisma.playingGames.create({
      data: {
        userId,
        gamespotId: addPlayingGameDTO.gamespotId,
        name: game.name,
        description: game.description,
        imageUrl: game.imageUrl,
        releaseDate: new Date(game.releaseDate),
        metacriticScore: game.metacriticScore,
        timeToBeat: {
          gameplayMain,
          gameplayMainExtra,
          gameplayCompletionist,
        },
        platforms,
        startDate: new Date(addPlayingGameDTO.startDate),
      },
    });
  }

  async list(
    userId: number,
    name?: string,
    page = 1,
    limit = 50,
  ): Promise<ListGamesDTO> {
    const offset = (page - 1) * limit;

    const [totalElements, games] = await Promise.all([
      this.prisma.playingGames.count({
        where: {
          userId,
          name: name
            ? {
                contains: name,
                mode: 'insensitive',
              }
            : undefined,
        },
      }),
      this.prisma.playingGames.findMany({
        where: {
          userId,
          name: name
            ? {
                contains: name,
                mode: 'insensitive',
              }
            : undefined,
        },
        orderBy: {
          name: 'asc',
        },
        skip: offset,
        take: limit,
      }),
    ]);

    const elementsPerPage = limit;
    const totalPages = Math.ceil(totalElements / elementsPerPage);
    const currentPage = page;

    return new ListGamesDTO(
      games,
      totalElements,
      elementsPerPage,
      totalPages,
      currentPage,
    );
  }

  async find(id: number, userId: number) {
    const playingGame = await this.prisma.playingGames.findFirst({
      where: {
        id,
        AND: {
          userId,
        },
      },
    });

    if (!playingGame) {
      throw new HttpException('game_not_found', HttpStatus.NOT_FOUND);
    }

    return playingGame;
  }

  async update(
    id: number,
    userId: number,
    updatePlayingGameDTO: UpdatePlayingGameDTO,
  ): Promise<PlayingGames> {
    const playingGame = await this.find(id, userId);

    return await this.prisma.playingGames.update({
      where: {
        id: playingGame.id,
      },
      data: {
        name: updatePlayingGameDTO.name,
        description: updatePlayingGameDTO.description,
        imageUrl: updatePlayingGameDTO.imageUrl,
        releaseDate: updatePlayingGameDTO.releaseDate,
        metacriticScore: updatePlayingGameDTO.metacriticScore,
        timeToBeat:
          updatePlayingGameDTO.timeToBeat as unknown as Prisma.JsonValue,
        platforms: updatePlayingGameDTO.platforms,
        startDate: updatePlayingGameDTO.startDate,
      },
    });
  }

  async delete(id: number, userId: number) {
    const playingGame = await this.find(id, userId);

    await this.prisma.playingGames.delete({
      where: { id: playingGame.id },
    });
  }

  async upgradeToCompleted(
    id: number,
    userId: number,
    addCompletedGameDTO: AddCompletedGameDTO,
  ): Promise<CompletedGames> {
    const playingGame = await this.find(id, userId);

    const addAsCompleted = await this.completedGamesService.add(
      playingGame.userId,
      addCompletedGameDTO,
    );

    await this.prisma.playingGames.delete({
      where: { id: playingGame.id },
    });

    return addAsCompleted;
  }
}
