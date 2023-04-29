import { IsArray, IsInt } from 'class-validator';

export class TimeToBeatAndPlatformsDTO {
  @IsInt()
  gameplayMain: number;
  @IsInt()
  gameplayMainExtra: number;
  @IsInt()
  gameplayCompletionist: number;
  @IsArray()
  platforms: Array<string>;
}
