import { Injectable } from '@nestjs/common';
import { CreateCompletedGameDto } from './dto/create-completed-game.dto';
import { UpdateCompletedGameDto } from './dto/update-completed-game.dto';

@Injectable()
export class CompletedGamesService {
  create(createCompletedGameDto: CreateCompletedGameDto) {
    return 'This action adds a new completedGame';
  }

  findAll() {
    return `This action returns all completedGames`;
  }

  findOne(id: number) {
    return `This action returns a #${id} completedGame`;
  }

  update(id: number, updateCompletedGameDto: UpdateCompletedGameDto) {
    return `This action updates a #${id} completedGame`;
  }

  remove(id: number) {
    return `This action removes a #${id} completedGame`;
  }
}
