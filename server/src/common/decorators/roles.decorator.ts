import { Reflector } from '@nestjs/core';
import { Role } from '../enums';

export const Roles = Reflector.createDecorator<Role[]>();
