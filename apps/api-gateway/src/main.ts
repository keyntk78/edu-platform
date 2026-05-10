/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix(AppModule.CONFIG.GLOBAL_PREFIX);
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
      }),
    );

    app.enableCors({
      origin: '*',
    });

    const config = new DocumentBuilder()
      .setTitle('Edu-Platform BFF API')
      .setDescription('Edu-Platform BFF Service API')
      .setVersion('1.0')
      .addTag('edu-platform-bff')
      .addBearerAuth({
        description: 'Enter JWT token',
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
        name: 'Authorization',
      })
      .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(
      `${AppModule.CONFIG.GLOBAL_PREFIX}/docs`,
      app,
      documentFactory,
    );

    await app.listen(AppModule.CONFIG.APP_CONFIG.PORT, () => {
      Logger.log(
        `🚀 Application is running on: http://localhost:${AppModule.CONFIG.APP_CONFIG.PORT}/${AppModule.CONFIG.GLOBAL_PREFIX}`,
      );

      Logger.log(
        `🚀 Documentation is running on: http://localhost:${AppModule.CONFIG.APP_CONFIG.PORT}/${AppModule.CONFIG.GLOBAL_PREFIX}/docs`,
      );
    });
  } catch (error) {
    console.error('❌ Error starting server:', error);
    process.exit(1);
  }
}

bootstrap();
