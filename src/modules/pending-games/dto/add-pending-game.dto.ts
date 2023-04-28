import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class AddPendingGameDTO {
  @ApiProperty()
  @IsInt()
  gamespotId: number;
}
