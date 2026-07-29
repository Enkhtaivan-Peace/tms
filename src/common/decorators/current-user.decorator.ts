import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    console.log('aaaa');
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
