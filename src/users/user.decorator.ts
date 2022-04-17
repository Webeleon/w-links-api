import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UsersEntity } from './users.entity';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UsersEntity => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
