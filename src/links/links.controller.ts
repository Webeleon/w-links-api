import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LinksService } from './links.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.decorator';
import { UsersEntity } from '../users/users.entity';
import { EventBus } from '@nestjs/cqrs';
import { UpdateLinkDto } from './dto/update-link.dto';
import { TrackRedirectEvent } from './track-redirect/track-redirect.event';
import { AuthenticatedGuard } from '../auth/guards/Authenticated.guard';
import { OrderLinkDto } from './dto/order-link.dto';

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

  @Get('/public/:uuid')
  async publicListByUsername(@Param('uuid') uuid: string) {
    const user = await this.usersService.findOneByUuid(uuid);
    if (!user) {
      throw new NotFoundException();
    }

    return this.linksService.getUserLinks(user);
  }

  @Post()
  @UseGuards(AuthenticatedGuard)
  async create(@Body() createLink: CreateLinkDto, @User() owner: UsersEntity) {
    return this.linksService.createLink(createLink, owner);
  }

  @Get()
  @UseGuards(AuthenticatedGuard)
  async getUserLinks(@User() user: UsersEntity) {
    return this.linksService.getUserLinks(user);
  }

  @Delete('/:uuid')
  @UseGuards(AuthenticatedGuard)
  async deleteLink(@User() user: UsersEntity, @Param('uuid') uuid: string) {
    const affected = await this.linksService.deleteLink(user, uuid);
    if (affected === 0) {
      throw new NotFoundException();
    }
    return;
  }

  @Put('/:uuid')
  @UseGuards(AuthenticatedGuard)
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

  @Patch('/manage/order')
  @UseGuards(AuthenticatedGuard)
  async orderLinks(
    @User() user: UsersEntity,
    @Body() linkOrder: OrderLinkDto[],
  ) {
    return this.linksService.order(user, linkOrder);
  }
}
