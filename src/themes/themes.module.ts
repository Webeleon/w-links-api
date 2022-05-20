import { Module } from '@nestjs/common';
import { ThemesController } from './themes.controller';
import { ThemesService } from './themes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThemeEntity } from './theme.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([ThemeEntity]), UsersModule],
  controllers: [ThemesController],
  providers: [ThemesService],
})
export class ThemesModule {}
