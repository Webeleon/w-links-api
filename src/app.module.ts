import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from './configurations/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
    }),
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
