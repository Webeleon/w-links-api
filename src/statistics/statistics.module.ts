import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';
import { RedirectEventEntity } from '../links/track-redirect/redirect-event.entity';
import { LinksModule } from '../links/links.module';

@Module({
  imports: [TypeOrmModule.forFeature([RedirectEventEntity]), LinksModule],
  providers: [StatisticsService],
  controllers: [StatisticsController],
  exports: [StatisticsService],
})
export class StatisticsModule {}
