import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigType } from '@nestjs/config';
import { appConfig } from './configurations/app.config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get<ConfigType<typeof appConfig>>(appConfig.KEY);

  await app.listen(config.port, () => {
    Logger.log(`Server running on ${config.port}...`, 'bootstrap');
  });
}
bootstrap();
