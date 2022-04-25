import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Response,
  UseGuards,
  Request,
  Delete,
  Put,
  Logger,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LinksService } from './links.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateLinkDto } from './dto/create-link.dto';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.decorator';
import { UsersEntity } from '../users/users.entity';
import { EventBus } from '@nestjs/cqrs';
import { TrackRedirectEvent } from './statistics/track-redirect.event';
import { UpdateLinkDto } from './dto/update-link.dto';

@ApiTags('Links')
@Controller('links')
export class LinksController {
  constructor(
    private readonly linksService: LinksService,
    private readonly usersService: UsersService,
    private readonly eventBus: EventBus,
  ) {}

  @Get('/:uuid')
  async redirect(@Param('uuid') uuid: string, @Response() res, @Request() req) {
    const link = await this.linksService.findByUuid(uuid);
    if (!link) {
      throw new NotFoundException();
    }

    this.eventBus.publish(new TrackRedirectEvent(link, req));

    res.redirect(link.target);
  }

  @Get('/public/:username')
  async publicListByUsername(@Param('username') username: string) {
    const user = await this.usersService.findOneByUsername(username);
    if (!user) {
      throw new NotFoundException();
    }

    return this.linksService.getUserLinks(user);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() createLink: CreateLinkDto, @User() owner: UsersEntity) {
    return this.linksService.createLink(createLink, owner);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getUserLinks(@User() user: UsersEntity) {
    return this.linksService.getUserLinks(user);
  }

  @Delete('/:uuid')
  @UseGuards(AuthGuard('jwt'))
  async deleteLink(@User() user: UsersEntity, @Param('uuid') uuid: string) {
    const affected = await this.linksService.deleteLink(user, uuid);
    if (affected === 0) {
      throw new NotFoundException();
    }
    return;
  }

  @Put('/:uuid')
  @UseGuards(AuthGuard('jwt'))
  async updateLink(
    @Param('uuid') uuid: string,
    @Body() updateLinkDto: UpdateLinkDto,
    @User() user: UsersEntity,
  ) {
    const affected = await this.linksService.updateLink(
      user,
      uuid,
      updateLinkDto,
    );
    if (affected === 0) {
      throw new NotFoundException();
    }
    return;
  }
}
