import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ThemeEntity } from './theme.entity';
import { Repository } from 'typeorm';
import { UsersEntity } from '../users/users.entity';
import { UpdateThemeDto } from './dto/update-theme.dto';
import { UsersService } from '../users/users.service';
import { UserNotFoundException } from '../users/exception/user-not-found.exception';

@Injectable()
export class ThemesService {
  constructor(
    @InjectRepository(ThemeEntity)
    private readonly themeRepository: Repository<ThemeEntity>,
  ) {}

  async getThemeByUsernameOrCreate(username: string): Promise<ThemeEntity> {
    return this.themeRepository.findOne({
      where: {
        owner: {
          username,
        },
      },
      relations: ['owner'],
    });
  }

  async updateTheme(
    owner: UsersEntity,
    updateThemeDto: UpdateThemeDto,
  ): Promise<void> {
    await this.themeRepository.update(
      {
        owner,
      },
      updateThemeDto,
    );
  }
}
