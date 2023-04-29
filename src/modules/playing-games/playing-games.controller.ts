import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  Get,
  Query,
  Param,
  Patch,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { PlayingGamesService } from './playing-games.service';
import { AddPlayingGameDTO } from './dto/add-playing-game.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { SearchGameDTO } from '../games/dto/search-game.dto';
import { UpdatePlayingGameDTO } from './dto/update-playing-game.dto';
import { AddCompletedGameDTO } from '../completed-games/dto/add-completed-game.dto';

@Controller('playing-games')
@ApiTags('playing-games')
@ApiBearerAuth()
export class PlayingGamesController {
  constructor(private readonly playingGamesService: PlayingGamesService) {}

  @UseGuards(JwtAuthGuard)
  @Post('add')
  async add(@Request() req, @Body() addPlayingGameDTO: AddPlayingGameDTO) {
    return this.playingGamesService.add(req.user.id, addPlayingGameDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Get('list')
  async list(@Request() req, @Query() searchGameDTO: SearchGameDTO) {
    return await this.playingGamesService.list(
      req.user.id,
      searchGameDTO.name,
      searchGameDTO.page,
      searchGameDTO.limit,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('find/:id')
  async find(@Request() req, @Param('id') id: number) {
    return await this.playingGamesService.find(id, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('edit/:id')
  async update(
    @Request() req,
    @Param('id') id: number,
    @Body() updatePlayingGameDTO: UpdatePlayingGameDTO,
  ) {
    return await this.playingGamesService.update(
      id,
      req.user.id,
      updatePlayingGameDTO,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete('remove/:id')
  @HttpCode(204)
  async delete(@Request() req, @Param('id') id: number) {
    return await this.playingGamesService.delete(id, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/upgrade-to-completed')
  async upgradeToCompleted(
    @Request() req,
    @Param('id') id: number,
    @Body() addCompletedGameDTO: AddCompletedGameDTO,
  ) {
    return await this.playingGamesService.upgradeToCompleted(
      id,
      req.user.id,
      addCompletedGameDTO,
    );
  }
}
