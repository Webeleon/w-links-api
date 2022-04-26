import {
  Controller,
  Get,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { StatisticSummaryDto } from './dto/statistic-summary.dto';
import { StatisticsService } from './statistics.service';
import { LinksService } from '../links/links.service';

@Controller('statistics')
@UseGuards(AuthGuard('jwt'))
export class StatisticsController {
  constructor(
    private readonly statsService: StatisticsService,
    private readonly linksService: LinksService,
  ) {}

  // TODO: get all visits with timeframe as query params

  @Get('/:uuid/summary')
  async getSummary(@Param('uuid') uuid: string): Promise<StatisticSummaryDto> {
    const link = await this.linksService.findByUuid(uuid);
    if (!link) {
      throw new NotFoundException(`link with uuid ${uuid} not found!`);
    }
    return this.statsService.getLinkStatsSummary(link);
  }
}
