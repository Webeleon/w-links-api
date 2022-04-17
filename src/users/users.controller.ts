import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  async profile(@Request() req) {
    return req.user;
  }
}
