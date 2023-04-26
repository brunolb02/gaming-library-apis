import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export class SearchGameDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
}
