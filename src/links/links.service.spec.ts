import { Test, TestingModule } from '@nestjs/testing';
import { LinksService } from './links.service';
import { getTypeormInMemoryModuleHelper } from '../test-helpers/get-typeorm-in-memory-module.helper';
import { LinksEntity } from './links.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('LinksService', () => {
  let linksService: LinksService;
  let linkRepo: Repository<LinksEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: getTypeormInMemoryModuleHelper([LinksEntity]),
      providers: [LinksService],
    }).compile();

    linksService = module.get<LinksService>(LinksService);
    linkRepo = module.get<Repository<LinksEntity>>(
      getRepositoryToken(LinksEntity),
    );
  });

  it('should be defined', () => {
    expect(linksService).toBeDefined();
  });
});
