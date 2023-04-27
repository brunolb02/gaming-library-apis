import { Controller } from '@nestjs/common';
import { CompletedGamesService } from './completed-games.service';

@Controller('completed-games')
export class CompletedGamesController {
  constructor(private readonly completedGamesService: CompletedGamesService) {}
}
