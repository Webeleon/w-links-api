import { LinksEntity } from '../links.entity';
import { Request } from 'express';

export class TrackRedirectEvent {
  constructor(
    public readonly link: LinksEntity,
    public readonly request: Request,
  ) {}
}
