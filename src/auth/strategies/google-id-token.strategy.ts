import { PassportStrategy } from '@nestjs/passport';
import {
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Request } from 'express';
import { authConfig } from '../../configurations/auth.config';
import { UsersService } from '../../users/users.service';
import { UsersEntity } from '../../users/users.entity';
import { Strategy } from 'passport-custom';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class GoogleStrategy extends PassportStrategy(
  Strategy,
  'google-id-token',
) {
  private client: OAuth2Client;

  constructor(
    @Inject(authConfig.KEY)
    private readonly config: ConfigType<typeof authConfig>,
    private readonly usersService: UsersService,
  ) {
    super();
    this.client = new OAuth2Client(config.googleClientId);
  }

  async validate(request: Request): Promise<UsersEntity> {
    try {
      const bearer = request.header('Authorization').replace('Bearer ', '');
      const payload = (
        await this.client.verifyIdToken({
          idToken: bearer,
          audience: this.config.googleClientId,
        })
      ).getPayload();

      const user = await this.usersService.findOneOrCreateByGoogleIdOrEmail({
        googleId: payload.sub,
        email: payload.email,
        username: payload.name,
      });

      return user;
    } catch (error: any) {
      Logger.error(error.message, GoogleStrategy.name);
      throw new UnauthorizedException();
    }
  }
}
