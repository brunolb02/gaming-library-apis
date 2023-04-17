import { Injectable } from '@nestjs/common';
import { CreatePlayingGameDto } from './dto/create-playing-game.dto';
import { UpdatePlayingGameDto } from './dto/update-playing-game.dto';

@Injectable()
export class PlayingGamesService {
  create(createPlayingGameDto: CreatePlayingGameDto) {
    return 'This action adds a new playingGame';
  }

  findAll() {
    return `This action returns all playingGames`;
  }

  findOne(id: number) {
    return `This action returns a #${id} playingGame`;
  }

  update(id: number, updatePlayingGameDto: UpdatePlayingGameDto) {
    return `This action updates a #${id} playingGame`;
  }

  remove(id: number) {
    return `This action removes a #${id} playingGame`;
  }
}
