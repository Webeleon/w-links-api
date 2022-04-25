import { Test, TestingModule } from '@nestjs/testing';
import { LinksService } from './links.service';
import { getTypeormInMemoryModuleHelper } from '../test-helpers/get-typeorm-in-memory-module.helper';
import { LinksEntity } from './links.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersEntity } from '../users/users.entity';
import { audit } from 'rxjs';
import { LinksType } from './links-type.enum';

describe('LinksService', () => {
  let linksService: LinksService;
  let linkRepo: Repository<LinksEntity>;
  let module: TestingModule;
  let user1: UsersEntity;
  let user2: UsersEntity;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: getTypeormInMemoryModuleHelper([LinksEntity, UsersEntity]),
      providers: [LinksService],
    }).compile();

    linksService = module.get<LinksService>(LinksService);
    linkRepo = module.get<Repository<LinksEntity>>(
      getRepositoryToken(LinksEntity),
    );

    const userRepo = module.get<Repository<UsersEntity>>(
      getRepositoryToken(UsersEntity),
    );
    user1 = userRepo.create({
      username: 'user1',
      passwordHash: 'FAKE',
    });
    user2 = userRepo.create({
      username: 'user2',
      passwordHash: 'FAKE',
    });
    await userRepo.save([user1, user2]);
  });

  afterEach(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(linksService).toBeDefined();
  });

  it('find one by uuid', async () => {
    const link = await linkRepo.save(
      linkRepo.create({
        target: 'https://webeleon.dev',
        displayName: 'webeleon',
      }),
    );
    expect((await linksService.findByUuid(link.uuid)).target).toBe(
      'https://webeleon.dev',
    );
  });

  it('create link', async () => {
    const link = await linksService.createLink(
      {
        target: 'test.dev',
      },
      user1,
    );

    expect(link).toBeDefined();
    expect(await linkRepo.count()).toBe(1);
  });

  it('get user links', async () => {
    await linkRepo.save([
      linkRepo.create({
        target: 'user1.link1',
        owner: user1,
      }),
      linkRepo.create({
        target: 'user1.link2',
        owner: user1,
      }),
      linkRepo.create({
        target: 'user2.link1',
        owner: user2,
      }),
    ]);
    expect(await linksService.getUserLinks(user1)).toHaveLength(2);
  });

  it('delete user link', async () => {
    const linkUser1 = linkRepo.create({
      target: 'sdf.df',
      owner: user1,
    });
    const linkUser2 = linkRepo.create({
      target: 'sdf.df',
      owner: user2,
    });
    await linkRepo.save([linkUser1, linkUser2]);

    const affected = await linksService.deleteLink(user1, linkUser1.uuid);
    expect(affected).toBe(1);
    expect(
      await linkRepo.findOne({
        where: {
          uuid: linkUser1.uuid,
        },
      }),
    ).not.toBeDefined();
  });

  it('update link', async () => {
    const linkUser1 = linkRepo.create({
      type: LinksType.DISCORD,
      target: 'sdf.df',
      owner: user1,
    });
    const linkUser2 = linkRepo.create({
      target: 'sdf.df',
      owner: user2,
    });
    await linkRepo.save([linkUser1, linkUser2]);

    const affected = await linksService.updateLink(user1, linkUser1.uuid, {
      type: 'linkedin' as LinksType,
    });
    expect(affected).toBe(1);
    expect(
      (
        await linkRepo.findOne({
          uuid: linkUser1.uuid,
        })
      ).type,
    ).toBe(LinksType.LINKEDIN);

    const affected2 = await linksService.updateLink(user2, linkUser1.uuid, {
      type: 'linkedin' as LinksType,
    });
    expect(affected2).toBe(0);
  });
});
