import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { TimeToBeatDTO } from 'src/modules/games/dto/time-to-beat.dto';

export class UpdatePlayingGameDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  releaseDate?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  metacriticScore?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @ValidateNested()
  @Type(() => TimeToBeatDTO)
  timeToBeat?: TimeToBeatDTO;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  platforms?: Array<string>;

  @ApiPropertyOptional({
    example: '2023-01-21',
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  startDate?: Date;
}
