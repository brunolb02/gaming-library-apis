import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { GamesService } from './games.service';
import { SearchGameDTO } from './dto/search-game.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('games')
@ApiTags('games')
@ApiBearerAuth()
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @UseGuards(JwtAuthGuard)
  @Get('search')
  async search(@Query() searchGameDTO: SearchGameDTO) {
    return await this.gamesService.search(
      searchGameDTO.name,
      searchGameDTO.page,
      searchGameDTO.limit,
    );
  }
}
