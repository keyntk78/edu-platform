/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(AppModule.CONFIG.GLOBAL_PREFIX);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  await app.listen(AppModule.CONFIG.APP_CONFIG.PORT, () => {
    Logger.log(
      `🚀 Application is running on: http://localhost:${AppModule.CONFIG.APP_CONFIG.PORT}/${AppModule.CONFIG.GLOBAL_PREFIX}`,
    );
  });
}

bootstrap();
