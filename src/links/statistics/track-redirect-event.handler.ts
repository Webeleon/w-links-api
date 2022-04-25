import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { TrackRedirectEvent } from './track-redirect.event';
import { InjectRepository } from '@nestjs/typeorm';
import { RedirectEventEntity } from './redirect-event.entity';
import { Repository } from 'typeorm';

@EventsHandler(TrackRedirectEvent)
export class TrackRedirectEventHandler
  implements IEventHandler<TrackRedirectEvent>
{
  constructor(
    @InjectRepository(RedirectEventEntity)
    private readonly redirectEventRepo: Repository<RedirectEventEntity>,
  ) {}

  async handle(event: TrackRedirectEvent) {
    const { request, link } = event;

    const redirect = this.redirectEventRepo.create({
      ip: request.ip,
      ips: JSON.stringify(request.ips),
      link,
      acceptLanguage: request.header('Accept-Language'),
      userAgent: request.header('User-Agent'),
    });
    await this.redirectEventRepo.save(redirect);
  }
}
