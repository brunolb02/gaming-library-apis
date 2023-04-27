import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class TimeToBeatDTO {
  @ApiProperty()
  @IsInt()
  gameplayMain: number;

  @ApiProperty()
  @IsInt()
  gameplayMainExtra: string;

  @ApiProperty()
  @IsInt()
  gameplayCompletionist: string;
}
