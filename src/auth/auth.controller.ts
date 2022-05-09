import { Controller, Post, UseGuards, Request, HttpCode } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@ApiTags('Authentification')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiBody({
    type: LoginDto,
  })
  @UseGuards(AuthGuard('local'))
  @HttpCode(200)
  login(@Request() req) {
    return this.authService.login(req.user);
  }
}
