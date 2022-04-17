import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from '../users/users.entity';
import { LinksEntity } from '../links/links.entity';

export const getTypeormInMemoryModuleHelper = (entities: any[]) => [
  TypeOrmModule.forRoot({
    type: 'better-sqlite3',
    database: ':memory:',
    synchronize: true,
    entities: [UsersEntity, LinksEntity],
    dropSchema: true,
  }),
  TypeOrmModule.forFeature(entities),
];
