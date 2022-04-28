import { AuthGuard } from '@nestjs/passport';

export class AuthenticatedGuard extends AuthGuard(['jwt', 'google-id-token']) {}
