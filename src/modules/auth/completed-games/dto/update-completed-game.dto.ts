import { PartialType } from '@nestjs/mapped-types';
import { CreateCompletedGameDto } from './create-completed-game.dto';

export class UpdateCompletedGameDto extends PartialType(
  CreateCompletedGameDto,
) {}
