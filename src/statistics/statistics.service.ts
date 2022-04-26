import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { StatisticSummaryDto } from './dto/statistic-summary.dto';
import { RedirectEventEntity } from '../links/track-redirect/redirect-event.entity';
import { LinksEntity } from '../links/links.entity';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(RedirectEventEntity)
    private readonly redirectEventRepository: Repository<RedirectEventEntity>,
  ) {}

  async getLinkStatsSummary(link: LinksEntity): Promise<StatisticSummaryDto> {
    return {
      clicks: await this.redirectEventRepository.count({
        where: {
          link,
        },
      }),
    };
  }
}
