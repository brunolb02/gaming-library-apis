import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsInt } from 'class-validator';

export class AddPlayingGameDTO {
  @ApiProperty()
  @IsInt()
  gamespotId: number;

  @ApiProperty({
    example: '2023-01-21',
  })
  @IsDate()
  @Type(() => Date)
  startDate: Date;
}
