import { Module } from '@nestjs/common';
import { GamespotService } from './gamespot.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        timeout: configService.getOrThrow('HTTP_TIMEOUT'),
        maxRedirects: configService.getOrThrow('HTTP_MAX_REDIRECTS'),
        baseURL: configService.getOrThrow('GAMESPOT_API_BASE_URL'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [GamespotService],
  exports: [GamespotService],
})
export class GamespotModule {}
