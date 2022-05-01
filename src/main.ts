import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigType } from '@nestjs/config';
import { appConfig } from './configurations/app.config';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const documentConfig = new DocumentBuilder()
    .setTitle('W-Links API')
    .setDescription('API to share links and get sharing stats')
    .addBearerAuth()
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, documentConfig);
  SwaggerModule.setup('swagger', app, swaggerDocument);

  app.enableCors();

  const config = app.get<ConfigType<typeof appConfig>>(appConfig.KEY);
  await app.listen(config.port, config.baseUrl, () => {
    Logger.log(`Server running on ${config.port}...`, 'bootstrap');
  });
}
bootstrap();
