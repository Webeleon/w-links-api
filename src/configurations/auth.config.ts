import { registerAs } from '@nestjs/config';

export const authConfig = registerAs('auth', () => ({
  jwtSecret: process.env.JWT_SECRET || 'not a secret',
  googleClientId:
    process.env.GOOGLE_CLIENT_ID ||
    '1035799241886-c071l8kgob11it5pueeesqlvo9o0ho4u.apps.googleusercontent.com',
}));
