import { Module } from '@nestjs/common';
import { TrackRedirectEventHandler } from './track-redirect-event.handler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedirectEventEntity } from './redirect-event.entity';
import { StatisticsController } from './statistics.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RedirectEventEntity])],
  providers: [TrackRedirectEventHandler],
  controllers: [StatisticsController],
})
export class StatisticsModule {}
