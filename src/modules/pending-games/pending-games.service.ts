import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GamesService } from '../games/games.service';
import { PlayingGamesService } from '../playing-games/playing-games.service';
import { AddPendingGameDTO } from './dto/add-pending-game.dto';
import { PendingGames, PlayingGames, Prisma } from '@prisma/client';
import { ListGamesDTO } from '../games/dto/list-games.dto';
import { UpdatePendingGameDTO } from './dto/update-pending-game.dto';
import { AddPlayingGameDTO } from '../playing-games/dto/add-playing-game.dto';

@Injectable()
export class PendingGamesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly gamesService: GamesService,
    private readonly playingGamesService: PlayingGamesService,
  ) {}

  async add(
    userId: number,
    addPendingGameDTO: AddPendingGameDTO,
  ): Promise<PendingGames> {
    const game = await this.gamesService.searchSpecific(
      addPendingGameDTO.gamespotId,
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

    return await this.prisma.pendingGames.create({
      data: {
        userId,
        gamespotId: addPendingGameDTO.gamespotId,
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
      this.prisma.pendingGames.count({
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
      this.prisma.pendingGames.findMany({
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
    const pendingGame = await this.prisma.pendingGames.findFirst({
      where: {
        id,
        AND: {
          userId,
        },
      },
    });

    if (!pendingGame) {
      throw new HttpException('game_not_found', HttpStatus.NOT_FOUND);
    }

    return pendingGame;
  }

  async update(
    id: number,
    userId: number,
    updatePendingGameDTO: UpdatePendingGameDTO,
  ): Promise<PendingGames> {
    const pendingGame = await this.find(id, userId);

    return await this.prisma.pendingGames.update({
      where: {
        id: pendingGame.id,
      },
      data: {
        name: updatePendingGameDTO.name,
        description: updatePendingGameDTO.description,
        imageUrl: updatePendingGameDTO.imageUrl,
        releaseDate: updatePendingGameDTO.releaseDate,
        metacriticScore: updatePendingGameDTO.metacriticScore,
        timeToBeat:
          updatePendingGameDTO.timeToBeat as unknown as Prisma.JsonValue,
        platforms: updatePendingGameDTO.platforms,
      },
    });
  }

  async delete(id: number, userId: number) {
    const pendingGame = await this.find(id, userId);

    await this.prisma.pendingGames.delete({
      where: { id: pendingGame.id },
    });
  }

  async upgradeToPlaying(
    id: number,
    userId: number,
    addPlayingGameDTO: AddPlayingGameDTO,
  ): Promise<PlayingGames> {
    const pendingGame = await this.find(id, userId);

    const addAsCompleted = await this.playingGamesService.add(
      pendingGame.userId,
      addPlayingGameDTO,
    );

    await this.prisma.pendingGames.delete({
      where: { id: pendingGame.id },
    });

    return addAsCompleted;
  }
}
