import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdatePasswordDTO {
  @IsNotEmpty()
  @ApiProperty()
  newPassword: string;

  @IsNotEmpty()
  @ApiProperty()
  oldPassword: string;
}
