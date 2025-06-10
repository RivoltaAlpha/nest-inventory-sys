# Authentication

![1741550989476](image/Authentication/1741550989476.png)

![1741551029786](image/Authentication/1741551029786.png)

This NestJS application implements a comprehensive JWT-based authentication system with Role-Based Access Control (RBAC) using access and refresh tokens. The system provides secure user authentication, authorization based on user roles, and token management with automatic route protection and fine-grained access control.

## Key Features

- 🔐 **JWT-based Authentication** - Secure token-based authentication
- 🔄 **Dual Token System** - Separate access and refresh tokens
- 🛡️ **Global Route Protection** - All routes protected by default
- 👥 **Role-Based Access Control** - Fine-grained access control based on user roles
- 🎯 **Flexible Access Control** - Easy public route designation
- 🔧 **Custom Decorators** - Convenient user data extraction and role specification
- 📊 **TypeORM Integration** - Database-backed user management
- 🔒 **Password Hashing** - bcrypt for secure password storage

## Role-Based Access Control (RBAC)

### User Roles

The system supports four distinct user roles with different access levels:

- **ADMIN** - Full system access, can manage all resources
- **FACULTY** - Can manage courses, students, and view most resources
- **STUDENT** - Limited access, can view own data and course information
- **GUEST** - Minimal access for public information

### Role Hierarchy

```text
ADMIN (Highest)
├── Full access to all endpoints
├── Can create, read, update, delete all resources
└── Can manage users and their roles

FACULTY
├── Can manage courses and departments
├── Can view and manage student information
├── Can access most GET endpoints
└── Cannot delete critical resources

STUDENT
├── Can view own profile and course information
├── Can update own profile
├── Limited to read-only access for most resources
└── Cannot access administrative functions

GUEST (Lowest)
├── Access to public endpoints only
├── Can view general course/department information
└── Cannot access user-specific data
```
## Setting Up Authentication

### Installation

To set up authentication in NestJS, you'll need to install the following packages:

```bash
pnpm add @nestjs/passport passport passport-jwt
pnpm add @nestjs/jwt
pnpm add -D @types/passport-jwt
pnpm add bcrypt
```

For TypeScript typings:

```bash
pnpm add -D @types/passport-jwt @types/bcrypt
```

### Authentication Flow with RBAC in this Application

1. **User registers (signs up)** via `/auth/signup` endpoint

![1741551283527](image/Authentication/1741551283527.png)

2. **User logs in (signs in)** via `/auth/signin` endpoint and receives:

- Access token (short-lived, contains user role)
- Refresh token (long-lived, contains user role)

![1741551391995](image/Authentication/1741551391995.png)

3. **User includes the access token** in requests to protected resources via Bearer token

- Token is validated by AtGuard (authentication)
- User role is checked by RolesGuard (authorization)

![1741551559998](image/Authentication/1741551559998.png)

4. **When the access token expires**, user can get a new one via `/auth/refresh` endpoint using the refresh token

![1741551711126](image/Authentication/1741551711126.png)

![1741551779848](image/Authentication/1741551779848.png)

5. **User can sign out** via `/auth/signout/:id` endpoint to invalidate their tokens

![1741551854680](image/Authentication/1741551854680.png)

## NestJS Authentication and Authorization Components: Decorators, Strategies, and Guards Explained

### Decorators

Decorators in NestJS are special functions that modify the behavior of classes, methods, or parameters. In authentication and authorization:

#### `@Public()` Decorator

```typescript
@Public()
@Get('categories')
findAll() {
  // This endpoint is accessible without authentication
}
```

- **Purpose**: Marks specific routes as publicly accessible
- **How it works**: Sets metadata that tells guards to skip authentication checks

#### `@Roles()` Decorator

```typescript
@Roles(Role.ADMIN, Role.FACULTY)
@Get('students')
findAll() {
  // This endpoint is accessible only to ADMIN and FACULTY roles
}
```

- **Purpose**: Specifies which user roles can access specific routes
- **How it works**: Sets metadata containing required roles for the RolesGuard to check

### Strategies

Strategies define how authentication is performed - they implement different authentication methods.

#### Access Token Strategy

```typescript
// This validates regular API requests
@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt-at') {
  constructor(private readonly configService: ConfigService) {
   super({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: configService.getOrThrow('JWT_ACCESS_TOKEN_SECRET'),
   });
  }

  validate(payload: JWTPayload) {
   return payload; // This attaches the user data to request.user
  }
}
```

- **Purpose**: Validates short-lived access tokens
- **How it works**: Extracts the JWT from the Authorization header, verifies it with the secret key, and attaches the payload to the request

#### Refresh Token Strategy

```typescript
// This specifically validates refresh token requests
@Injectable()
export class RfStrategy extends PassportStrategy(Strategy, 'jwt-rt') {
  // Similar implementation, but for refresh tokens
}
```

- **Purpose**: Validates long-lived refresh tokens
- **How it works**: Similar to access token strategy but uses a different secret key

> Please remember to register both strategies in the `auth.module.ts` as providers
>
> `providers: [AuthService, AtStrategy, RfStrategy],`

### Guards

Guards are middleware that determine if a request can proceed to a route handler.

#### Access Token Guard

```typescript
@Injectable()
export class AtGuard extends AuthGuard('jwt-at') {
  // Implementation that checks if routes are public or protected
}
```

- **Purpose**: Protects routes from unauthorized access
- **How it works**: Intercepts requests and uses the access token strategy to validate before allowing the request to proceed
- Applied globally to all routes by default

#### Refresh Token Guard

```typescript
@Injectable()
export class RtGuard extends AuthGuard('jwt-rt') {
  // Implementation specifically for refresh token validation
}
```

- **Purpose**: Specifically protects the token refresh endpoint
- **How it works**: Uses the refresh token strategy to validate refresh tokens

#### Roles Guard

```typescript
@Injectable()
export class RolesGuard implements CanActivate {
  // Implementation that checks user roles against required roles
}
```

- **Purpose**: Provides role-based authorization for endpoints
- **How it works**: Fetches user's role from database and compares with required roles specified in @Roles() decorator
- Applied at controller or method level for fine-grained access control

### How They Work Together

1. When a request comes in, the **AtGuard** intercepts it for authentication
2. The AtGuard uses an **AtStrategy** to validate the JWT token
3. If authentication is successful, user information is attached to the request
4. The **RolesGuard** then checks if the user has the required role(s) for authorization
5. If authorized, your controller methods can use **Decorators** to easily access user information

**Authentication Flow:**

- **AtGuard** → **AtStrategy** → User authenticated
- **RolesGuard** → Database lookup → User authorized
- **Controller** → **Decorators** → Access user data

This separation creates a clean, secure authentication and authorization system where you can:

- Control which routes require authentication (AtGuard + @Public())
- Control which roles can access specific routes (RolesGuard + @Roles())
- Easily access authenticated user information in controllers

## Implementation Details

### Auth Module Structure

The authentication system is organized as follows:

```
src/auth/
├── auth.controller.ts
├── auth.module.ts
├── auth.service.ts
├── decorators/
│   ├── get-current-user.decorator.ts
│   ├── get-current-user-id.decorator.ts
│   ├── index.ts
│   ├── public.decorator.ts
│   └── roles.decorator.ts
├── dto/
│   └── login.dto.ts
├── guards/
│   ├── at.guard.ts
│   ├── index.ts
│   ├── roles.guard.ts
│   └── rt.guard.ts
└── strategies/
    ├── at.startegy.ts
    ├── index.ts
    └── rt.strategy.ts
```

### Authentication Controller

The `AuthController` handles authentication operations:

```typescript
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  signUpLocal(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.signUpLocal(createAuthDto);
  }

  @Public()
  @Post('signin')
  signInLocal(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.signInLocal(createAuthDto);
  }
  
  @UseGuards(AtGuard)
  @Get('signout/:id')
  signOut(@Param('id') id: string) {
    return this.authService.signOut(id);
  }

  @UseGuards(RtGuard)
  @Get('refresh')
  refreshTokens(
    @Query('id') id: string,
    @Req() req: RequestWithUser,
  ) {
    const user = req.user;
    if (user.sub !== id) {
      throw new UnauthorizedException('Invalid user');
    }
    return this.authService.refreshTokens(id, user.refreshToken);
  }
}
```

### Authentication Service

The `AuthService` handles authentication business logic:

```typescript
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  // Sign up a new user
  async signUpLocal(createAuthDto: CreateAuthDto) {
    // Check if user exists
    // Hash password
    // Save user
    // Generate tokens
    // Return tokens
  }

  // Sign in an existing user
  async signInLocal(AuthData: CreateAuthDto) {
    // Check if user exists
    // Validate password
    // Generate tokens
    // Save refresh token
    // Return tokens
  }

  // Sign out a user
  async signOut(userId: string) {
    // Remove refresh token
    // Return success message
  }

  // Refresh tokens
  async refreshTokens(userId: string, refreshToken: string) {
    // Validate refresh token
    // Generate new tokens
    // Update refresh token
    // Return new tokens
  }

  // Generate access and refresh tokens
  private async getTokens(userId: string, email: string) {
    // Generate access token
    // Generate refresh token
    // Return tokens
  }
}
```

### JWT Strategies

Two JWT strategies are implemented:

1. **Access Token Strategy** (`at.strategy.ts`):

   ```typescript
   @Injectable()
   export class AtStrategy extends PassportStrategy(Strategy, 'jwt-at') {
     constructor(private readonly configService: ConfigService) {
       super({
         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
         secretOrKey: configService.getOrThrow('JWT_ACCESS_TOKEN_SECRET'),
       });
     }

     validate(payload: JWTPayload) {
       return payload; // attaches payload to request.user
     }
   }
   ```
2. **Refresh Token Strategy** (`rt.strategy.ts`):

   ```typescript
   @Injectable()
   export class RfStrategy extends PassportStrategy(Strategy, 'jwt-rt') {
     constructor(private readonly configService: ConfigService) {
       super({
         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
         secretOrKey: configService.getOrThrow('JWT_REFRESH_TOKEN_SECRET'),
         passReqToCallback: true,
       });
     }

     validate(req: Request, payload: any) {
       const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
       return { ...payload, refreshToken };
     }
   }
   ```

### Auth Guards

Two guards protect routes:

1. **Access Token Guard** (`at.guard.ts`):

   ```typescript
   @Injectable()
   export class AtGuard extends AuthGuard('jwt-at') {
     constructor(private reflector: Reflector) {
       super();
     }

     canActivate(context: ExecutionContext) {
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
2. **Refresh Token Guard** (`rt.guard.ts`):

   ```typescript
   @Injectable()
   export class RtGuard extends AuthGuard('jwt-rt') {
     constructor() {
       super();
     }
   }
   ```

### Custom Decorators

1. **Public Decorator** - Marks routes as public (no authentication required):

   ```typescript
   export const Public = () => SetMetadata('isPublic', true);
   ```

## Global Authentication

In this application, all routes are protected by default through the global application of the `AtGuard`:

```typescript
// In app.module.ts
@Module({
  // ...
  providers: [
    // ...
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    }
  ],
})
export class AppModule {}
```

## How to Use Authentication

### Protecting Routes

All routes are protected by default. To access them, include the access token in your request:

```http
GET http://localhost:8000/books
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Making Routes Public

To make a route public (no authentication required), use the `@Public()` decorator:

```typescript
import { Public } from '../auth/decorators';

@Controller('categories')
export class CategoriesController {
  // ...
  
  @Public()
  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }
  
  // ...
}
```

### Authentication Flow

1. **Register a new user**:

   ```http
   POST http://localhost:8000/auth/signup
   Content-Type: application/json

   {
     "email": "user@example.com",
     "password": "securepassword123"
   }
   ```
2. **Sign in to get tokens**:

   ```http
   POST http://localhost:8000/auth/signin
   Content-Type: application/json

   {
     "email": "user@example.com",
     "password": "securepassword123"
   }
   ```

   Response:

   ```json
   {
     "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
     "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   }
   ```
3. **Access protected resources**:

   ```http
   GET http://localhost:8000/books
   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
4. **Refresh tokens when access token expires**:

   ```http
   GET http://localhost:8000/auth/refresh?id=user-id
   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
5. **Sign out**:

   ```http
   GET http://localhost:8000/auth/signout/user-id
   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

## Environment Configuration

The authentication system uses environment variables for configuration:

```
JWT_ACCESS_TOKEN_SECRET=your-access-token-secret
JWT_ACCESS_TOKEN_EXPIRATION_TIME=15m
JWT_REFRESH_TOKEN_SECRET=your-refresh-token-secret
JWT_REFRESH_TOKEN_EXPIRATION_TIME=7d
```

## Security Best Practices

1. **Separate token secrets**: Different secrets for access and refresh tokens.
2. **Short-lived access tokens**: Access tokens are short-lived (15 minutes by default).
3. **Longer-lived refresh tokens**: Refresh tokens last longer but can be invalidated.
4. **Password hashing**: Passwords are hashed using bcrypt before storage.
5. **Token invalidation**: Refresh tokens can be invalidated on sign-out.
6. **Public route marking**: Explicitly mark which routes should be public.
7. **Global protection**: All routes are protected by default.

## Conclusion

This NestJS application implements a comprehensive JWT-based authentication system with robust Role-Based Access Control (RBAC) using separate access and refresh tokens. The system provides multiple layers of security:

### Security Features

1. **Authentication Layer**: JWT tokens with separate secrets for access and refresh tokens
2. **Authorization Layer**: Role-based access control with fine-grained permissions
3. **Global Protection**: All routes protected by default with explicit public route marking
4. **Database Integration**: Real-time role validation against user profiles
5. **Token Management**: Secure token generation, validation, and invalidation

### Key Benefits

- **Scalable Authorization**: Easy to add new roles and modify permissions
- **Developer Experience**: Simple decorators for route protection and role specification
- **Security Best Practices**: Short-lived access tokens, role-based restrictions, password hashing
- **Flexible Access Control**: Support for public routes, role combinations, and hierarchical permissions
- **Audit Trail**: Clear separation between authentication and authorization for better logging
