import { Module } from '@nestjs/common';
import { TrackRedirectEventHandler } from './track-redirect-event.handler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedirectEventEntity } from './redirect-event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RedirectEventEntity])],
  providers: [TrackRedirectEventHandler],
})
export class StatisticsModule {}
