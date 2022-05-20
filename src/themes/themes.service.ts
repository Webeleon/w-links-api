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
    private readonly usersService: UsersService,
  ) {}

  async getThemeByUsernameOrCreate(username: string): Promise<ThemeEntity> {
    let theme = await this.themeRepository.findOne({
      where: {
        owner: {
          username,
        },
      },
      relations: ['owner'],
    });

    // TODO: remove, lazy hack to avoid creating migration
    if (!theme) {
      const user = await this.usersService.findOneByUsername(username);
      if (!user) throw new UserNotFoundException();
      theme = this.themeRepository.create({
        owner: user,
      });
      await this.themeRepository.save(theme);
    }

    return theme;
  }

  async updateTheme(
    owner: UsersEntity,
    updateThemeDto: UpdateThemeDto,
  ): Promise<void> {
    // TODO: remove, lazy hack to avoid creating migration
    await this.getThemeByUsernameOrCreate(owner.username);
    await this.themeRepository.update(
      {
        owner,
      },
      updateThemeDto,
    );
  }
}
