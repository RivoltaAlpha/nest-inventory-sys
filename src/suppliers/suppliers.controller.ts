import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/role.decorators';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/users/dto/create-user.dto'; 
import { AtGuard } from 'src/auth/guards/at.guards';

@ApiBearerAuth('access-token')
@ApiTags('Suppliers') // This groups the endpoints under the 'Suppliers' tag in Swagger documentation
@UseGuards(RolesGuard, AtGuard) // This applies the RolesGuard to all endpoints in this controller
@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Post()
  @Roles(Role.Admin, Role.Manager)
  create(@Body() createSupplierDto: CreateSupplierDto) {
    return this.suppliersService.create(createSupplierDto);
  }

  @Get()
  @Roles(Role.Admin, Role.Manager, Role.Supplier) 
  findAll() {
    return this.suppliersService.findAll();
  }

  @Get(':id')
  @Roles(Role.Admin, Role.Manager, Role.Supplier) 
  findOne(@Param('id') id: string) {
    return this.suppliersService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.Admin, Role.Supplier) 
  update(
    @Param('id') id: string,
    @Body() updateSupplierDto: UpdateSupplierDto,
  ) {
    return this.suppliersService.update(+id, updateSupplierDto);
  }

  @Delete(':id')
  @Roles(Role.Admin, Role.Supplier) 
  remove(@Param('id') id: string) {
    return this.suppliersService.remove(+id);
  }
}
