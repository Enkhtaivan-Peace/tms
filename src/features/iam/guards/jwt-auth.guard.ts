import { ExecutionContext, Injectable } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    console.log('canActivate');

    return super.canActivate(context);
  }

  getRequest(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    console.log('Authorization:', request.headers.authorization);

    return request;
  }

  handleRequest(err, user, info, context) {
    console.log({
      err,
      user,
      info,
    });

    return super.handleRequest(err, user, info, context);
  }
}
