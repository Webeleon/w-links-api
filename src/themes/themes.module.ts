import { Module } from '@nestjs/common';
import { ThemesController } from './themes.controller';
import { ThemesService } from './themes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThemeEntity } from './theme.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ThemeEntity])],
  controllers: [ThemesController],
  providers: [ThemesService],
})
export class ThemesModule {}
