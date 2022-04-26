import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from '../users/users.entity';
import { LinksEntity } from '../links/links.entity';
import { RedirectEventEntity } from '../links/track-redirect/redirect-event.entity';

export const getTypeormInMemoryModuleHelper = (entities: any[]) => [
  TypeOrmModule.forRoot({
    type: 'better-sqlite3',
    database: ':memory:',
    synchronize: true,
    entities: [UsersEntity, LinksEntity, RedirectEventEntity],
    dropSchema: true,
  }),
  TypeOrmModule.forFeature(entities),
];
