import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { Role } from 'src/users/dto/create-user.dto';
import { ROLES_KEY } from '../decorators/role.decorators';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private configService: ConfigService,
    private reflector: Reflector, // This is the Reflector service used to access metadata
    @InjectRepository(User) 
    private userRepository: Repository<User>, 
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
    ]);
    if (!roles) {
      return true; // If no roles are defined, allow access
    }

    const request = this.getRequest(context);
    const user = request.user;

    // Check if user has any of the required roles
    const hasRole = () => user.roles.some((role) => roles.includes(role));
    if (user && hasRole()) {
      return true;
    }

    return false;
  }

  getRequest(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    return request;
  }
  // use access token to get user roles
    // and check if user has any of the required roles
    // If user does not have the required roles, return false
    // If user has the required roles, return true
    
}
