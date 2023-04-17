import { Injectable } from '@nestjs/common';
import { CreatePendingGameDto } from './dto/create-pending-game.dto';
import { UpdatePendingGameDto } from './dto/update-pending-game.dto';

@Injectable()
export class PendingGamesService {
  create(createPendingGameDto: CreatePendingGameDto) {
    return 'This action adds a new pendingGame';
  }

  findAll() {
    return `This action returns all pendingGames`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pendingGame`;
  }

  update(id: number, updatePendingGameDto: UpdatePendingGameDto) {
    return `This action updates a #${id} pendingGame`;
  }

  remove(id: number) {
    return `This action removes a #${id} pendingGame`;
  }
}
