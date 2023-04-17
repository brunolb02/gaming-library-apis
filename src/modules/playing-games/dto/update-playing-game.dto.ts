import { PartialType } from '@nestjs/mapped-types';
import { CreatePlayingGameDto } from './create-playing-game.dto';

export class UpdatePlayingGameDto extends PartialType(CreatePlayingGameDto) {}
