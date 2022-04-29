import {
  Controller,
  Get,
  UseGuards,
  Request,
  Post,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { RegisterUserDto } from './dto/register-user.dto';
import { UsersService } from './users.service';
import { AuthenticatedGuard } from '../auth/guards/Authenticated.guard';
import { User } from './user.decorator';
import { UsersEntity } from './users.entity';
import { UserDto } from './dto/user.dto';

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
    };
  }

  @Post()
  async register(@Body() registerUserDto: RegisterUserDto) {
    return this.usersService.register(registerUserDto);
  }
}
