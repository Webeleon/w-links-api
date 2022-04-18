import { Module } from '@nestjs/common';
import { LinksService } from './links.service';
import { LinksController } from './links.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinksEntity } from './links.entity';
import { UsersModule } from '../users/users.module';
import { StatisticsModule } from './statistics/statistics.module';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [
    TypeOrmModule.forFeature([LinksEntity]),
    UsersModule,
    StatisticsModule,
    CqrsModule,
  ],
  providers: [LinksService],
  controllers: [LinksController],
})
export class LinksModule {}
