import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PlayingGamesService } from './playing-games.service';
import { CreatePlayingGameDto } from './dto/create-playing-game.dto';
import { UpdatePlayingGameDto } from './dto/update-playing-game.dto';

@Controller('playing-games')
export class PlayingGamesController {
  constructor(private readonly playingGamesService: PlayingGamesService) {}

  @Post()
  create(@Body() createPlayingGameDto: CreatePlayingGameDto) {
    return this.playingGamesService.create(createPlayingGameDto);
  }

  @Get()
  findAll() {
    return this.playingGamesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playingGamesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePlayingGameDto: UpdatePlayingGameDto,
  ) {
    return this.playingGamesService.update(+id, updatePlayingGameDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playingGamesService.remove(+id);
  }
}
