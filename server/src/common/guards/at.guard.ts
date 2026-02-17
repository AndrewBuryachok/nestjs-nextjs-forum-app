import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Public } from '../decorators';

@Injectable()
export class AtGuard extends AuthGuard('jwt-access') {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride(Public, [
      context.getHandler(),
      context.getClass(),
    ]);
    try {
      return (await super.canActivate(context)) as boolean;
    } catch (error) {
      if (isPublic) {
        return true;
      }
      throw error;
    }
  }
}
