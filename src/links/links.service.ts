import { Injectable, Logger } from '@nestjs/common';
import { LinksEntity } from './links.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLinkDto } from './dto/create-link.dto';
import { UsersService } from '../users/users.service';
import { UsersEntity } from '../users/users.entity';
import { UpdateLinkDto } from './dto/update-link.dto';

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

  async getUserLinks(user: UsersEntity): Promise<LinksEntity[]> {
    return this.linksRepo.find({
      where: {
        owner: user,
      },
      order: {
        createdAt: 1,
      },
    });
  }

  async deleteLink(user: UsersEntity, uuid: string): Promise<number> {
    const deleteResults = await this.linksRepo.delete({
      owner: user,
      uuid,
    });
    return deleteResults.affected;
  }

  async updateLink(
    user: UsersEntity,
    uuid: string,
    updateLinkDto: UpdateLinkDto,
  ): Promise<number> {
    Logger.debug(JSON.stringify(updateLinkDto));
    const updateResult = await this.linksRepo.update(
      {
        uuid,
        owner: user,
      },
      updateLinkDto,
    );
    return updateResult.affected;
  }
}
