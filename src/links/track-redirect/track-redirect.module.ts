import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedirectEventEntity } from './redirect-event.entity';
import { TrackRedirectEventHandler } from './track-redirect-event.handler';

@Module({
  imports: [TypeOrmModule.forFeature([RedirectEventEntity])],
  providers: [TrackRedirectEventHandler],
})
export class TrackRedirectModule {}
