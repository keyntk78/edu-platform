import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CONFIG, TConfig } from '../config';

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
}
