import { Module, ValidationPipe } from '@nestjs/common';
import { HealthController } from './health.controller';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from './configurations/app.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './configurations/database.config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { LinksModule } from './links/links.module';
import { APP_PIPE } from '@nestjs/core';
import { UsersEntity } from './users/users.entity';
import { LinksEntity } from './links/links.entity';
import { RedirectEventEntity } from './links/statistics/redirect-event.entity';

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
        autoLoadEntities: [UsersEntity, LinksEntity, RedirectEventEntity],
        synchronize: true,
      }),
    }),
    AuthModule,
    UsersModule,
    LinksModule,
  ],
  controllers: [HealthController],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    },
  ],
})
export class AppModule {}
