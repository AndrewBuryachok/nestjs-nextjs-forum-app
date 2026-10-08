import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class ForumApiKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const apiKey = req.headers['x-api-key'];
    return apiKey === process.env.SERVER_FORUM_API_KEY;
  }
}
