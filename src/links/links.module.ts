import { Module } from '@nestjs/common';
import { LinksService } from './links.service';
import { LinksController } from './links.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinksEntity } from './links.entity';
import { UsersModule } from '../users/users.module';
import { CqrsModule } from '@nestjs/cqrs';
import { MetadataController } from './metadata/metadata.controller';
import { TrackRedirectModule } from './track-redirect/track-redirect.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([LinksEntity]),
    UsersModule,
    CqrsModule,
    TrackRedirectModule,
  ],
  providers: [LinksService],
  controllers: [LinksController, MetadataController],
  exports: [LinksService],
})
export class LinksModule {}
