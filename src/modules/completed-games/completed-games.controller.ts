import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CompletedGamesService } from './completed-games.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { AddCompletedGameDTO } from './dto/add-completed-game.dto';
import { SearchGameDTO } from '../games/dto/search-game.dto';
import { UpdateCompletedGameDTO } from './dto/update-completed-game.dto';

@Controller('completed-games')
@ApiTags('completed-games')
@ApiBearerAuth()
export class CompletedGamesController {
  constructor(private readonly completedGamesService: CompletedGamesService) {}

  @UseGuards(JwtAuthGuard)
  @Post('add')
  async add(@Request() req, @Body() addCompletedGameDTO: AddCompletedGameDTO) {
    return await this.completedGamesService.add(
      req.user.id,
      addCompletedGameDTO,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('list')
  async list(@Request() req, @Query() searchGameDTO: SearchGameDTO) {
    return await this.completedGamesService.list(
      req.user.id,
      searchGameDTO.name,
      searchGameDTO.page,
      searchGameDTO.limit,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('find/:id')
  async find(@Request() req, @Param('id') id: number) {
    return await this.completedGamesService.find(id, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('edit/:id')
  async update(
    @Request() req,
    @Param('id') id: number,
    @Body() updateCompletedGameDTO: UpdateCompletedGameDTO,
  ) {
    return await this.completedGamesService.update(
      id,
      req.user.id,
      updateCompletedGameDTO,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete('remove/:id')
  @HttpCode(204)
  async delete(@Request() req, @Param('id') id: number) {
    return await this.completedGamesService.delete(id, req.user.id);
  }
}
