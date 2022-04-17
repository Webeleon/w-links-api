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
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LinksService } from './links.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateLinkDto } from './dto/create-link.dto';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.decorator';
import { UsersEntity } from '../users/users.entity';

@ApiTags('Links')
@Controller('links')
export class LinksController {
  constructor(
    private readonly linksService: LinksService,
    private readonly userSservice: UsersService,
  ) {}

  @Get('/:uuid')
  async redirect(@Param('uuid') uuid: string, @Response() res) {
    const link = await this.linksService.findByUuid(uuid);
    if (!link) {
      throw new NotFoundException();
    }

    res.redirect(link.target);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() createLink: CreateLinkDto, @User() owner: UsersEntity) {
    return this.linksService.createLink(createLink, owner);
  }
}
