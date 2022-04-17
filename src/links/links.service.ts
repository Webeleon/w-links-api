import { Injectable } from '@nestjs/common';
import { LinksEntity } from './links.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLinkDto } from './dto/create-link.dto';
import { UsersService } from '../users/users.service';
import { UsersEntity } from '../users/users.entity';

@Injectable()
export class LinksService {
  constructor(
    @InjectRepository(LinksEntity)
    private readonly linksRepo: Repository<LinksEntity>,
  ) {}

  async findByUuid(uuid: string): Promise<LinksEntity | null> {
    return this.linksRepo.findOne({
      where: {
        uuid,
      },
    });
  }

  async createLink(
    createLinkDto: CreateLinkDto,
    owner: UsersEntity,
  ): Promise<any> {
    const link = this.linksRepo.create({
      ...createLinkDto,
      owner,
    });

    await this.linksRepo.save(link);
    return link;
  }
}
