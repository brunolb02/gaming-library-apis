import { IsInt, IsString } from 'class-validator';

export class GameDTO {
  @IsInt()
  id: number;
  @IsString()
  name: string;
  @IsString()
  description: string;
  @IsString()
  imageUrl: string;
  @IsString()
  releaseDate: string;
  @IsInt()
  metacriticScore: number;
}
