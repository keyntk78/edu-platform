import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({})
export class DatabaseModule {
  static forRoot(entities: unknown[]): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRootAsync({
          useFactory: () => ({
            type: 'postgres',
            host: process.env['DB_HOST'] || 'localhost',
            port: Number(process.env['DB_PORT']) || 5432,
            username: process.env['DB_USERNAME'] || 'postgres',
            password: process.env['DB_PASSWORD'] || 'postgres',
            database: process.env['DB_NAME'] || 'edu_platform',
            entities,
            synchronize: process.env['NODE_ENV'] !== 'production',
            logging: process.env['NODE_ENV'] === 'development',
          }),
        }),
        TypeOrmModule.forFeature(entities),
      ],
      exports: [TypeOrmModule],
    };
  }
}
