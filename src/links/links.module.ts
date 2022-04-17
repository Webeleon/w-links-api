import { Module } from '@nestjs/common';
import { LinksService } from './links.service';
import { LinksController } from './links.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinksEntity } from './links.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([LinksEntity]), UsersModule],
  providers: [LinksService],
  controllers: [LinksController],
})
export class LinksModule {}
