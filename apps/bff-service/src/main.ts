/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(AppModule.CONFIG.GLOBAL_PREFIX);
  await app.listen(AppModule.CONFIG.APP_CONFIG.PORT, () => {
    Logger.log(
      `🚀 Application is running on: http://localhost:${AppModule.CONFIG.APP_CONFIG.PORT}/${AppModule.CONFIG.GLOBAL_PREFIX}`,
    );
  });
}

bootstrap();
