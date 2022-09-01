import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../role.enum';
import { ROLES_KEY } from '../role.decorator';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles =
      this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]) || [];

    if (!requiredRoles) {
      return true;
    }

    let isAllowed = false;
    // console.log(isAllowed);
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;
    // console.log(user.role);

    requiredRoles.forEach((role) => {
      if (user.role?.includes(role)) {
        isAllowed = true;
      }
    });
    // console.log(isAllowed);

    return isAllowed;
  }
}
