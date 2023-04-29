import { IsDate, IsInt, IsString } from 'class-validator';

export class GameDTO {
  @IsInt()
  gamespotId: number;
  @IsString()
  name: string;
  @IsString()
  description: string;
  @IsString()
  imageUrl: string;
  @IsDate()
  releaseDate: Date;
  @IsInt()
  metacriticScore: number;
}
