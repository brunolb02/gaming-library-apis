import { PartialType } from '@nestjs/mapped-types';
import { CreatePendingGameDto } from './create-pending-game.dto';

export class UpdatePendingGameDto extends PartialType(CreatePendingGameDto) {}
