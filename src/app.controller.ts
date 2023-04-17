import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('')
@ApiTags('Health Check')
export class AppController {
  @Get('/health')
  getHello(): string {
    return 'OK!';
  }
}
