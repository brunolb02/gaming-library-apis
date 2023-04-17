import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PendingGamesService } from './pending-games.service';
import { CreatePendingGameDto } from './dto/create-pending-game.dto';
import { UpdatePendingGameDto } from './dto/update-pending-game.dto';

@Controller('pending-games')
export class PendingGamesController {
  constructor(private readonly pendingGamesService: PendingGamesService) {}

  @Post()
  create(@Body() createPendingGameDto: CreatePendingGameDto) {
    return this.pendingGamesService.create(createPendingGameDto);
  }

  @Get()
  findAll() {
    return this.pendingGamesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pendingGamesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePendingGameDto: UpdatePendingGameDto,
  ) {
    return this.pendingGamesService.update(+id, updatePendingGameDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pendingGamesService.remove(+id);
  }
}
