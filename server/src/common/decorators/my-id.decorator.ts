import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from '../interfaces';

export const MyId = createParamDecorator((_, context: ExecutionContext) => {
  const req = context.switchToHttp().getRequest();
  const user = req.user as JwtPayload;
  return user.sub;
});
