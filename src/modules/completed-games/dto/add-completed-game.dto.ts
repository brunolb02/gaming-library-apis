import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsInt, IsString } from 'class-validator';

export class AddCompletedGameDTO {
  @ApiProperty()
  @IsInt()
  gamespotId: number;
  @ApiProperty({
    example: '2023-01-21',
  })
  @IsDate()
  @Type(() => Date)
  completedDate: Date;
  @ApiProperty()
  @IsInt()
  userScore: number;
  @ApiProperty()
  @IsInt()
  totalTimeToBeat: number;
  @ApiProperty()
  @IsInt()
  rank: number;
  @ApiProperty()
  @IsString()
  review: string;
}
