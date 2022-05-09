import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getTypeormInMemoryModuleHelper } from '../test-helpers/get-typeorm-in-memory-module.helper';
import { UsersEntity } from './users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UsersService', () => {
  let module: TestingModule;
  let usersService: UsersService;
  let userRepo: Repository<UsersEntity>;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: getTypeormInMemoryModuleHelper([UsersEntity]),
      providers: [UsersService],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    userRepo = module.get<Repository<UsersEntity>>(
      getRepositoryToken(UsersEntity),
    );

    await userRepo.insert([
      userRepo.create({
        username: 'test',
        passwordHash: await bcrypt.hash('password', 10),
      }),
    ]);
  });

  afterEach(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });
});
