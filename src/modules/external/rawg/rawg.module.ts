import { Module } from '@nestjs/common';
import { RawgService } from './rawg.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        timeout: configService.getOrThrow('HTTP_TIMEOUT'),
        maxRedirects: configService.getOrThrow('HTTP_MAX_REDIRECTS'),
        baseURL: configService.getOrThrow('RAWG_API_BASE_URL'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [RawgService],
  exports: [RawgService],
})
export class RawgModule {}
