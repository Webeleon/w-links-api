import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserDto } from '../users/dto/user.dto';
import * as bcrypt from 'bcrypt';
import { LoginResponseDto } from './dto/login.response.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<UserDto> {
    const user = await this.usersService.findOneByUsername(username);
    if (user && (await bcrypt.compare(password, user.passwordHash))) {
      const { passwordHash, ...userDto } = user;
      return userDto;
    }
    return null;
  }

  async login(user: UserDto): Promise<LoginResponseDto> {
    const payload = {
      ...user,
      sub: user.uuid,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
