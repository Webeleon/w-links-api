import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from './configurations/app.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './configurations/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot({ load: [databaseConfig] })],
      inject: [databaseConfig.KEY],
      useFactory: (dbConfig) => ({
        ...dbConfig,
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
