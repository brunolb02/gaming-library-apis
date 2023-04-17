import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CompletedGamesService } from './completed-games.service';
import { CreateCompletedGameDto } from './dto/create-completed-game.dto';
import { UpdateCompletedGameDto } from './dto/update-completed-game.dto';

@Controller('completed-games')
export class CompletedGamesController {
  constructor(private readonly completedGamesService: CompletedGamesService) {}

  @Post()
  create(@Body() createCompletedGameDto: CreateCompletedGameDto) {
    return this.completedGamesService.create(createCompletedGameDto);
  }

  @Get()
  findAll() {
    return this.completedGamesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.completedGamesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCompletedGameDto: UpdateCompletedGameDto,
  ) {
    return this.completedGamesService.update(+id, updateCompletedGameDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.completedGamesService.remove(+id);
  }
}
