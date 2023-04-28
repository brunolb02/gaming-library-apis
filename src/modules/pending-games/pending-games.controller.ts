import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
  HttpCode,
} from '@nestjs/common';
import { PendingGamesService } from './pending-games.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { AddPendingGameDTO } from './dto/add-pending-game.dto';
import { SearchGameDTO } from '../games/dto/search-game.dto';
import { UpdatePendingGameDTO } from './dto/update-pending-game.dto';
import { AddPlayingGameDTO } from '../playing-games/dto/add-playing-game.dto';

@Controller('pending-games')
@ApiTags('pending-games')
@ApiBearerAuth()
export class PendingGamesController {
  constructor(private readonly pendingGamesService: PendingGamesService) {}

  @UseGuards(JwtAuthGuard)
  @Post('add')
  async add(@Request() req, @Body() addPendingGameDTO: AddPendingGameDTO) {
    return this.pendingGamesService.add(req.user.id, addPendingGameDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Get('list')
  async list(@Request() req, @Query() searchGameDTO: SearchGameDTO) {
    return await this.pendingGamesService.list(
      req.user.id,
      searchGameDTO.name,
      searchGameDTO.page,
      searchGameDTO.limit,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('find/:id')
  async find(@Request() req, @Param('id') id: number) {
    return await this.pendingGamesService.find(id, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('edit/:id')
  async update(
    @Request() req,
    @Param('id') id: number,
    @Body() updatePendingGameDTO: UpdatePendingGameDTO,
  ) {
    return await this.pendingGamesService.update(
      id,
      req.user.id,
      updatePendingGameDTO,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete('remove/:id')
  @HttpCode(204)
  async delete(@Request() req, @Param('id') id: number) {
    return await this.pendingGamesService.delete(id, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/upgrade-to-playing')
  async upgradeToPlaying(
    @Request() req,
    @Param('id') id: number,
    @Body() addPlayingGameDTO: AddPlayingGameDTO,
  ) {
    return await this.pendingGamesService.upgradeToPlaying(
      id,
      req.user.id,
      addPlayingGameDTO,
    );
  }
}
