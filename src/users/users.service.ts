import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { RegisterGoogleUserDto } from './dto/register-google-user.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { UsernameNotAvailableException } from './exception/username-not-available.exception';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepo: Repository<UsersEntity>,
  ) {}

  async findOneByUsername(username: string): Promise<UsersEntity | null> {
    return this.usersRepo.findOne({
      where: {
        username,
      },
    });
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
      username: await this.generateAvailableUsername(
        registerGoogleUserDto.username,
      ),
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
    if (username) {
      if (await this.isUsernameAvailable(username)) {
        user.username = username;
      } else {
        throw new UsernameNotAvailableException();
      }
    }
    if (email) user.email = email;
    if (password) user.passwordHash = await bcrypt.hash(password, 10);

    await this.usersRepo.save(user);

    return user;
  }

  private async isUsernameAvailable(username: string) {
    return !!(await this.findOneByUsername(username));
  }

  private async generateAvailableUsername(username: string): Promise<string> {
    if (await this.isUsernameAvailable(username)) {
      return username;
    } else {
      return this.generateAvailableUsername(
        `${username}${Math.floor(Math.random() * 1000)}`,
      );
    }
  }
}
