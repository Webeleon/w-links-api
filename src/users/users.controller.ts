import {
  Controller,
  Get,
  UseGuards,
  Request,
  Post,
  Body,
  Put,
  BadRequestException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { RegisterUserDto } from './dto/register-user.dto';
import { UsersService } from './users.service';
import { AuthenticatedGuard } from '../auth/guards/Authenticated.guard';
import { User } from './user.decorator';
import { UsersEntity } from './users.entity';
import { UserDto } from './dto/user.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { UsernameNotAvailableException } from './exception/username-not-available.exception';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  @UseGuards(AuthenticatedGuard)
  async profile(@User() user: UsersEntity): Promise<UserDto> {
    return {
      uuid: user.uuid,
      username: user.username,
      email: user.email,
      active: user.active,
      googleId: user.googleId,
    };
  }

  @Put('profile')
  @UseGuards(AuthenticatedGuard)
  async updateUserProfile(
    @User() user: UsersEntity,
    @Body() updateUserProfileDto: UpdateUserProfileDto,
  ) {
    try {
      return this.profile(
        await this.usersService.updateUserProfile(user, updateUserProfileDto),
      );
    } catch (error: any) {
      if (error instanceof UsernameNotAvailableException) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }
}
