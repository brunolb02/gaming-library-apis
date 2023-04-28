import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateCompletedGameDTO {
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
  @IsDate()
  @Type(() => Date)
  completedDate?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  metacriticScore?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  userScore?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  totalTimeToBeat?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  rank?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  review?: string;
}
