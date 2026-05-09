import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CONFIG, TConfig } from '../config';
import { LoggerMiddleware } from '@common/middlewares/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => CONFIG],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static CONFIG: TConfig = CONFIG;

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
