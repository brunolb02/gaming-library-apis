import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.setGlobalPrefix('/v1');

  app.useGlobalPipes(new ValidationPipe({ whitelist: false, transform: true }));
  app.useGlobalFilters(new HttpExceptionFilter());

  app.enableCors();

  if (configService.get<string>('ENVIRONMENT') !== 'PRODUCTION') {
    app.use(
      ['/docs'],
      basicAuth({
        challenge: true,
        users: {
          [configService.getOrThrow<string>('SWAGGER_USER')]:
            configService.getOrThrow<string>('SWAGGER_PASSWORD'),
        },
      }),
    );

    const config = new DocumentBuilder()
      .setTitle('Gaming Library APIs')
      .setDescription('APIs for gaming-library project')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('docs', app, document);
  }

  const servicePort = configService.get<number>('SERVICE_PORT') || 3000;

  await app.listen(servicePort, () => {
    console.log(
      `Server Successfully Started Listening on Port: ${servicePort}`,
    );
  });
}
bootstrap();
