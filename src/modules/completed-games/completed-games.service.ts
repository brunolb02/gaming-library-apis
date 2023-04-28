import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GamesService } from '../games/games.service';
import { AddCompletedGameDTO } from './dto/add-completed-game.dto';
import { CompletedGames } from '@prisma/client';
import { ListGamesDTO } from '../games/dto/list-games.dto';
import { UpdateCompletedGameDTO } from './dto/update-completed-game.dto';

@Injectable()
export class CompletedGamesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly gamesService: GamesService,
  ) {}

  async add(
    userId: number,
    addCompletedGameDTO: AddCompletedGameDTO,
  ): Promise<CompletedGames> {
    const game = await this.gamesService.searchSpecific(
      addCompletedGameDTO.gamespotId,
    );

    if (!game) {
      throw new HttpException('game_not_found', HttpStatus.NOT_FOUND);
    }

    return await this.prisma.completedGames.create({
      data: {
        userId,
        gamespotId: addCompletedGameDTO.gamespotId,
        name: game.name,
        description: game.description,
        imageUrl: game.imageUrl,
        releaseDate: new Date(game.releaseDate),
        completedDate: addCompletedGameDTO.completedDate,
        metacriticScore: game.metacriticScore,
        userScore: addCompletedGameDTO.userScore,
        totalTimeToBeat: addCompletedGameDTO.totalTimeToBeat,
        rank: addCompletedGameDTO.rank,
        review: addCompletedGameDTO.review,
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
      this.prisma.completedGames.count({
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
      this.prisma.completedGames.findMany({
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
    const completedGame = await this.prisma.completedGames.findFirst({
      where: {
        id,
        AND: {
          userId,
        },
      },
    });

    if (!completedGame) {
      throw new HttpException('game_not_found', HttpStatus.NOT_FOUND);
    }

    return completedGame;
  }

  async update(
    id: number,
    userId: number,
    updateCompletedGameDTO: UpdateCompletedGameDTO,
  ): Promise<CompletedGames> {
    const playingGame = await this.find(id, userId);

    return await this.prisma.completedGames.update({
      where: {
        id: playingGame.id,
      },
      data: {
        name: updateCompletedGameDTO.name,
        description: updateCompletedGameDTO.description,
        imageUrl: updateCompletedGameDTO.imageUrl,
        releaseDate: updateCompletedGameDTO.releaseDate,
        completedDate: updateCompletedGameDTO.completedDate,
        metacriticScore: updateCompletedGameDTO.metacriticScore,
        userScore: updateCompletedGameDTO.userScore,
        totalTimeToBeat: updateCompletedGameDTO.totalTimeToBeat,
        rank: updateCompletedGameDTO.rank,
        review: updateCompletedGameDTO.review,
      },
    });
  }

  async delete(id: number, userId: number) {
    const completedGame = await this.find(id, userId);

    await this.prisma.completedGames.delete({
      where: { id: completedGame.id },
    });
  }
}
