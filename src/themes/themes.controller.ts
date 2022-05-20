import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from '../auth/guards/Authenticated.guard';
import { User } from '../users/user.decorator';
import { UsersEntity } from '../users/users.entity';
import { UpdateThemeDto } from './dto/update-theme.dto';
import { ThemesService } from './themes.service';

@Controller('themes')
export class ThemesController {
  constructor(private readonly themeService: ThemesService) {}

  @Get(':username')
  async getThemeByUserName(@Param('username') username: string) {
    const theme = await this.themeService.getThemeByUsernameOrCreate(username);
    delete theme.owner;
    delete theme.uuid;
    return theme;
  }

  @UseGuards(AuthenticatedGuard)
  @Put()
  updateUserTheme(
    @User() owner: UsersEntity,
    @Body() updateThemeDto: UpdateThemeDto,
  ) {
    return this.themeService.updateTheme(owner, updateThemeDto);
  }
}
