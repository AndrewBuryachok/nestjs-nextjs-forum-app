import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayloadWithToken } from '../interfaces';

export const MyToken = createParamDecorator((_, context: ExecutionContext) => {
  const req = context.switchToHttp().getRequest();
  const user = req.user as JwtPayloadWithToken;
  return user.token;
});
