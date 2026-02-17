import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ExtJwtPayload } from '../interfaces';

export const MyId = createParamDecorator((_, context: ExecutionContext) => {
  const req = context.switchToHttp().getRequest();
  const user = req.user as ExtJwtPayload;
  return user.sub;
});
