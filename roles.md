# School Management System - JWT Authentication with Role-Based Access Control (RBAC)

Please check the: [API Design](./API%20Design.md)

# Authorization

## Role Based Access Control Architecture

The RBAC system follows a clean architecture pattern:

```
User Request → AtGuard (Authentication) → RolesGuard (Authorization) → Controller
                     ↓                           ↓
               JWT Validation              Database Role Check
```

This approach ensures that:

- Authentication is handled globally and consistently
- Authorization is granular and role-specific
- Controllers focus on business logic rather than security concerns
- Security policies can be easily maintained and updated

By combining JWT authentication with role-based authorization, this system provides enterprise-grade security while maintaining developer productivity and code maintainability.

# Step-by-Step RBAC Implementation Guide

This guide walks you through implementing Role-Based Access Control (RBAC) in a NestJS application using the exact code from this codebase.

## Step 1: Define User Roles

Create an enum to define the different user roles in your system.

**File:** `src/profiles/entities/profile.entity.ts`

```typescript
export enum Role {
  STUDENT = 'student',
  FACULTY = 'faculty',
  ADMIN = 'admin',
  GUEST = 'guest',
}

@Entity()
export class Profile {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.GUEST })
  role: Role;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'text', nullable: true, default: null })
  hashedRefreshToken: string | null;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @OneToOne(() => Student, (student) => student.profile)
  student: Relation<Student>;

  @OneToOne(() => Lecturer, (lecturer) => lecturer.profile)
  lecturer: Relation<Lecturer>;
}
```

## Step 2: Create Role Decorator

Create a decorator to mark endpoints with required roles.

**File:** `src/auth/decorators/roles.decorator.ts`

```typescript
import { SetMetadata } from '@nestjs/common';
import { Role } from '../../profiles/entities/profile.entity';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
```

SetMetadata(ROLES_KEY, roles) attaches the array of roles to the route or controller.
This metadata can then be read by guards (like your RolesGuard) to control access based on user roles.

## Step 3: Create Public Decorator

Create a decorator to mark endpoints as public (no authentication required).

**File:** `src/auth/decorators/public.decorator.ts`

```typescript
import { SetMetadata } from '@nestjs/common';

export const Public = () => SetMetadata('isPublic', true);
```

## Step 4: Update JWT Payload Interface

Update the JWT payload to include role information.

**File:** `src/auth/strategies/at.strategy.ts`

```typescript
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

export type JWTPayload = {
  sub: number;
  email: string;
  role: string;
};

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt-at') {
  constructor(private readonly configServices: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configServices.getOrThrow<string>('JWT_ACCESS_TOKEN_SECRET'),
    });
  }

  validate(payload: JWTPayload) {
    return payload; // Return the payload directly, which contains user information
  }
}
```

## Step 5: Update Auth Service to Include Roles

Modify the authentication service to include role information in JWT tokens.

**File:** `src/auth/auth.service.ts`

```typescript
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  // Helper method to generates access and refresh tokens for the user
  private async getTokens(userId: number, email: string, role: string) {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email: email,
          role: role,
        },
        {
          secret: this.configService.getOrThrow<string>(
            'JWT_ACCESS_TOKEN_SECRET',
          ),
          expiresIn: this.configService.getOrThrow<string>(
            'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
          ), // 15 minutes
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email: email,
          role: role,
        },
        {
          secret: this.configService.getOrThrow<string>(
            'JWT_REFRESH_TOKEN_SECRET',
          ),
          expiresIn: this.configService.getOrThrow<string>(
            'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
          ), // 60, "2 days", "10h", "7d"
        },
      ),
    ]);
    return { accessToken: at, refreshToken: rt };
  }

  // Method to sign in the user
  async signIn(createAuthDto: CreateAuthDto) {
    // check if the user exists in the database
    const foundUser = await this.profileRepository.findOne({
      where: { email: createAuthDto.email },
      select: ['id', 'email', 'password', 'role'], // Include role in selection
    });
    if (!foundUser) {
      throw new NotFoundException(
        `User with email ${createAuthDto.email} not found`,
      );
    }
    // compare hashed password with the password provided
    const foundPassword = await Bcrypt.compare(
      createAuthDto.password,
      foundUser.password,
    );
    if (!foundPassword) {
      throw new NotFoundException('Invalid credentials');
    }
    // if correct generate tokens
    const { accessToken, refreshToken } = await this.getTokens(
      foundUser.id,
      foundUser.email,
      foundUser.role,
    );

    // save refresh token in the database
    await this.saveRefreshToken(foundUser.id, refreshToken);
    // return the tokens
    return { accessToken, refreshToken };
  }

  // Method to refresh tokens
  async refreshTokens(id: number, refreshToken: string) {
    // get user
    const foundUser = await this.profileRepository.findOne({
      where: { id: id },
      select: ['id', 'email', 'role', 'hashedRefreshToken'], // Include role in selection
    });

    if (!foundUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (!foundUser.hashedRefreshToken) {
      throw new NotFoundException('No refresh token found');
    }

    // check if the refresh token is valid
    const refreshTokenMatches = await Bcrypt.compare(
      refreshToken,
      foundUser.hashedRefreshToken,
    );

    if (!refreshTokenMatches) {
      throw new NotFoundException('Invalid refresh token');
    }
    // generate new tokens
    const { accessToken, refreshToken: newRefreshToken } = await this.getTokens(
      foundUser.id,
      foundUser.email,
      foundUser.role,
    );
    // save new refresh token in the database
    await this.saveRefreshToken(foundUser.id, newRefreshToken);
    // return the new tokens
    return { accessToken, refreshToken: newRefreshToken };
  }
}
```

## Step 6: Create Access Token Guard

Create a guard that handles both authentication and public routes.

**File:** `src/auth/guards/at.guard.ts`

```typescript
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class AtGuard extends AuthGuard('jwt-at') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }
}
```

## Step 7: Create Roles Guard

Create a guard that validates user permissions based on their role.

**File:** `src/auth/guards/roles.guard.ts`

```typescript
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../../profiles/entities/profile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from '../../profiles/entities/profile.entity';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { JWTPayload } from '../strategies/at.strategy';

interface UserRequest extends Request {
  user?: JWTPayload; // Extend Request to include user property
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true; // No roles required, allow access
    }
    const request = context.switchToHttp().getRequest<UserRequest>();
    const user = request.user;

    if (!user) {
      return false; // No user in request
    }

    // Fetch the user's profile to get their role
    const userProfile = await this.profileRepository.findOne({
      where: { id: user.sub },
      select: ['id', 'role'],
    });

    if (!userProfile) {
      return false; // User profile not found
    }

    // Check if user's role is in the required roles
    return requiredRoles.some((role) => userProfile.role === role);
  }
}
```

## Step 8: Create Index Files for Guards and Decorators

**File:** `src/auth/guards/index.ts`

```typescript
export * from './at.guard';
export * from './rt.guard';
export * from './roles.guard';
```

**File:** `src/auth/decorators/index.ts`

```typescript
export * from './get-current-user-id.decorator';
export * from './get-current-user.decorator';
export * from './public.decorator';
export * from './roles.decorator';
```

## Step 9: Apply Guards to Controllers

Apply both authentication and authorization guards to your controllers.

**Example:** `src/profiles/profiles.controller.ts`

```typescript
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto, UpdateProfileDto } from './dto';
import { Public, Roles } from 'src/auth/decorators';
import { AtGuard, RolesGuard } from 'src/auth/guards';
import { Role } from './entities/profile.entity';

@Controller('profiles')
@UseGuards(AtGuard, RolesGuard)
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Public()
  @Post()
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.profilesService.create(createProfileDto);
  }

  @Roles(Role.ADMIN, Role.FACULTY)
  @Get()
  findAll(@Query('email') email?: string) {
    return this.profilesService.findAll(email);
  }

  @Roles(Role.ADMIN, Role.FACULTY, Role.STUDENT)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.profilesService.findOne(id);
  }

  @Roles(Role.ADMIN, Role.FACULTY, Role.STUDENT)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.profilesService.update(id, updateProfileDto);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.profilesService.remove(id);
  }
}
```

## Step 10: Configure Module Dependencies

Ensure all modules that use RBAC import the required dependencies.

**Example:** `src/profiles/profile.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Profile])],
  controllers: [ProfilesController],
  providers: [ProfilesService],
  exports: [ProfilesService],
})
export class ProfileModule {}
```

## Step 11: Configure Global Auth Module

Configure the auth module to provide guards globally.

**File:** `src/auth/auth.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from 'src/profiles/entities/profile.entity';
import { JwtModule } from '@nestjs/jwt';
import { AtStrategy, RfStrategy } from './strategies';
import { RolesGuard } from './guards';

@Module({
  imports: [TypeOrmModule.forFeature([Profile]), JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, AtStrategy, RfStrategy, RolesGuard],
  exports: [RolesGuard],
})
export class AuthModule {}
```

## Test Your RBAC Implementation!!


## Key Implementation Notes

1. **Guard Order Matters**: Always apply `AtGuard` before `RolesGuard` as authentication must happen before authorization.

2. **Public Routes**: Use `@Public()` decorator for endpoints that don't require authentication.

3. **Role Checking**: The `RolesGuard` queries the database to get the user's current role, ensuring real-time role validation.

4. **JWT Payload**: Include role information in JWT tokens but always verify against the database for security.

5. **Error Handling**: The guards return `false` for unauthorized access, which NestJS automatically converts to a 403 Forbidden response.

This implementation provides a robust, secure, and maintainable RBAC system that can be easily extended with additional roles and permissions.

### Module Configuration

Each module that uses RBAC must import the required dependencies:

```typescript
@Module({
  imports: [
    DatabaseModule, 
    TypeOrmModule.forFeature([Course, Department, Student, Profile])
  ],
  providers: [CoursesService, RolesGuard],
  controllers: [CoursesController],
})
export class CoursesModule {}
```

## RBAC Usage Guide

### Setting Up RBAC in Controllers

1. **Import Required Dependencies:**

```typescript
import { UseGuards } from '@nestjs/common';
import { Roles, Public } from 'src/auth/decorators';
import { AtGuard, RolesGuard } from 'src/auth/guards';
import { Role } from 'src/profiles/entities/profile.entity';
```

2. **Apply Guards at Controller Level:**

```typescript
@Controller('your-resource')
@UseGuards(AtGuard, RolesGuard)
export class YourController {
  // Your methods here
}
```

3. **Specify Role Requirements:**

```typescript
// Single role
@Roles(Role.ADMIN)
@Delete(':id')
deleteResource() {}

// Multiple roles
@Roles(Role.ADMIN, Role.FACULTY)
@Get()
findAll() {}

// Public access (no roles required)
@Public()
@Get('public-info')
getPublicInfo() {}
```

### Authorization Patterns

#### Create Operations

- **Public:** Profile and lecturer registration endpoints (`@Public()`)
- **ADMIN/FACULTY:** Creating students, courses, and departments
- **No Creation Rights:** Students cannot create institutional resources

#### Read Operations

- **Public:** None (all read operations require authentication)
- **All Authenticated (ADMIN/FACULTY/STUDENT):**
  - Individual profiles, students, courses, and departments
  - Student's own courses
  - Lecturer's courses
- **ADMIN/FACULTY Only:**
  - Listing all profiles, students, and lecturers
  - Course enrollment management
- **ADMIN Only:**
  - Enrolled students per course
  - Course-student relationship management

#### Update Operations

- **ADMIN/FACULTY:**
  - Institutional resource management (students, courses, departments, lecturers)
  - Student course enrollments
  - Lecturer course assignments
- **All Authenticated (ADMIN/FACULTY/STUDENT):**
  - Own profile updates (with ownership validation)

#### Delete Operations

- **ADMIN Only:**
  - All entity deletions (profiles, students, courses, departments, lecturers)
  - Course enrollment removals
  - For data integrity and audit compliance
- **No Delete Rights:** Faculty and Students cannot delete any resources

## Error Handling

The RBAC system provides clear error responses:

```json
// Insufficient permissions
{
  "statusCode": 403,
  "message": "Forbidden resource",
  "error": "Forbidden"
}

// Authentication required
{
  "statusCode": 401,
  "message": "Unauthorized",
  "error": "Unauthorized"
}
```

## Troubleshooting

### Common Issues

1. **403 Forbidden Error**: User doesn't have required role
2. **401 Unauthorized Error**: Invalid or expired token
3. **500 Internal Server Error**: Database connection issues or missing profile

### Debugging Steps

1. Verify user roles in database
2. Check JWT token validity
3. Ensure RolesGuard is properly imported in modules
4. Verify Profile entity is available in TypeORM

### Verification Commands

```sql
-- Check user roles
SELECT p.id, p.email, p.role FROM profile p;

-- Check if profiles exist
SELECT COUNT(*) FROM profile;
```

## Notes

- The `@Public()` decorator bypasses both authentication and authorization
- The `@Roles()` decorator requires authentication first (handled by AtGuard)
- Users can only be created via signup endpoint (which is public)
- Role assignment must be done directly in the database for this implementation
- Consider implementing an admin interface for role management in production
