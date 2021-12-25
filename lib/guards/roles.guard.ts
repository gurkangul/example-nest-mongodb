import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Reflector } from '@nestjs/core';
import { UserModel } from 'tools/models/user.model';
import { RoleModel } from 'tools/models/role.model';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const allowedRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    if (!allowedRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const authJsonWebToken = request.headers.authorization;
    console.log(authJsonWebToken);

    const result = jwt.verify(
      authJsonWebToken.slice(7, authJsonWebToken.length),
      process.env.JWT_SECRET,
    );

    const user: UserModel = result['user'];
    const allowed = await this.isAllowed(allowedRoles, user?.roles);
    if (!allowed) {
      throw new HttpException('Forbidden Method!', HttpStatus.FORBIDDEN);
    }
    return true;
  }

  async isAllowed(allowedRoles, userRoles: RoleModel[]) {
    try {
      const allUsersRoles = [];
      await Promise.all(
        userRoles.map((data) => {
          allUsersRoles.push(data.name);
        }),
      );
      console.log(allUsersRoles);

      const hasRole = allUsersRoles.some((role) => allowedRoles.includes(role));
      return hasRole;
    } catch (error) {
      console.log('error', error);
      return false;
    }
  }
}
