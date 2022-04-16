import { TypeOrmModule } from '@nestjs/typeorm';

export const getTypeormInMemoryModuleHelper = (entities: any[]) => [
  TypeOrmModule.forRoot({
    type: 'better-sqlite3',
    database: ':memory:',
    synchronize: true,
    autoLoadEntities: true,
    dropSchema: true,
  }),
  TypeOrmModule.forFeature(entities),
];
