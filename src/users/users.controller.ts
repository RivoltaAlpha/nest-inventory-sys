import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/role.decorators';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from './entities/user.entity';
import { AtGuard } from 'src/auth/guards/at.guards';

@ApiBearerAuth('access-token') // This indicates that the endpoints require authentication
@ApiTags('Users') // This groups the endpoints under the 'Users' tag in Swagger documentation
@UseGuards(RolesGuard, AtGuard) // This applies the RolesGuard to all endpoints in this controller
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public() // This endpoint is accessible without authentication
  @Post('create')
  @Roles(Role.Admin, Role.Manager) // This endpoint is restricted to users with the 'admin' or 'manager' role
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('all')
  @Roles(Role.Admin, Role.Manager, Role.Sales, Role.Warehouse) // This endpoint is restricted to users with the 'admin', 'manager', 'sales', or 'warehouse' role
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Roles(Role.Admin, Role.Manager, Role.Sales, Role.Warehouse, Role.Supplier) // This endpoint is restricted to users with the 'admin', 'manager', 'sales', 'warehouse', or 'supplier' role
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.Admin, Role.Manager, Role.Sales, Role.Warehouse) // This endpoint is restricted to users with the 'admin', 'manager', 'sales', or 'warehouse' role
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete('delete/:id')
  @Roles(Role.Admin, Role.Warehouse, Role.Manager, Role.Supplier, Role.Sales) // This endpoint is restricted to users with the 'admin', 'warehouse', or 'supplier' role
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Get('me')
  getProfile(@Req() req) {
    // req.user is set by the auth guard
    return this.usersService.findOne(req.user.user_id);
  }
}
