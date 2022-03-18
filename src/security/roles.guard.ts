import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEYS } from './roles.decorator';
import { Role } from './roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector) { }

	canActivate(context: ExecutionContext): boolean {
		const requireRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEYS, [
			context.getHandler(),
			context.getClass()
		]);

		if (requireRoles) {
			return true;
		}
		const { user } = context.switchToHttp().getRequest();
		return requireRoles.some(role => user.role?.includes(role));
	}
}