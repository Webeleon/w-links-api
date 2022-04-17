import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepo: Repository<UsersEntity>,
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<UserDto> {
    const { password, ...userInfo } = registerUserDto;
    const user = this.usersRepo.create({
      ...userInfo,
      passwordHash: await bcrypt.hash(registerUserDto.password, 10),
    });
    await this.usersRepo.save(user);

    return user;
  }

  async findOneByUsername(username: string): Promise<UsersEntity | null> {
    const user = await this.usersRepo.findOne({
      where: {
        username,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  }
}
