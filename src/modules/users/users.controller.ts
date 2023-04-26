import {
  Body,
  Controller,
  HttpStatus,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { UpdatePasswordDTO } from './dto/update-password.dto';

@Controller('user')
@ApiTags('user')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Put('update/password')
  public async updatePassword(
    @Request() req,
    @Body()
    updatePasswordDTO: UpdatePasswordDTO,
  ) {
    await this.usersService.updatePassword(req.user.id, updatePasswordDTO);

    return HttpStatus.OK;
  }
}
