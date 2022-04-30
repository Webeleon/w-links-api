import { registerAs } from '@nestjs/config';

export const appConfig = registerAs('app', () => ({
  port: process.env.PORT || 5000,
  baseUrl: process.env.BASE_URL || 'localhost',
}));
