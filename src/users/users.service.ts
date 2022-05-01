import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { RegisterGoogleUserDto } from './dto/register-google-user.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';

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
      active: false,
    });
    await this.usersRepo.save(user);

    return user;
  }

  async findOneOrCreateByGoogleIdOrEmail(
    registerGoogleUserDto: RegisterGoogleUserDto,
  ): Promise<UsersEntity> {
    const user = await this.usersRepo.findOne({
      googleId: registerGoogleUserDto.googleId,
    });
    if (user) {
      return user;
    }

    const newUser = this.usersRepo.create({
      ...registerGoogleUserDto,
      active: true,
    });
    await this.usersRepo.save(newUser);
    return newUser;
  }

  async findOneByUuid(uuid: string): Promise<UsersEntity | null> {
    const user = await this.usersRepo.findOne({
      where: {
        uuid,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async findOneByEmail(email: string): Promise<UsersEntity | null> {
    const user = await this.usersRepo.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async updateUserProfile(
    user: UsersEntity,
    { username, email, password }: UpdateUserProfileDto,
  ): Promise<UsersEntity> {
    if (username) user.username = username;
    if (email) user.email = email;
    if (password) user.passwordHash = await bcrypt.hash(password, 10);

    await this.usersRepo.save(user);

    return user;
  }
}
