import { registerAs } from '@nestjs/config';

export const databaseConfig = registerAs('database', () => ({
  type: process.env.DB_TYPE || 'postgres',
  host: process.env.DB_HOST || process.env.POSTGRESQL_ADDON_HOST || 'localhost',
  port: process.env.DB_PORT || process.env.POSTGRESQL_ADDON_PORT || 5432,
  username:
    process.env.DB_USERNAME || process.env.POSTGRESQL_ADDON_USER || 'postgres',
  password:
    process.env.DB_PASSWORD || process.env.POSTGRESQL_ADDON_PASSWORD || '',
  database:
    process.env.DB_DATABASE || process.env.POSTGRESQL_ADDON_DB || 'w_links_api',
}));
