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
import { WarehousesService } from './warehouses.service';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AtGuard } from 'src/auth/guards/at.guards';
import { Roles } from 'src/auth/decorators/role.decorators';
import { Role } from 'src/users/dto/create-user.dto';

@ApiBearerAuth('access-token')
@ApiTags('Warehouses') // This groups the endpoints under the 'Warehouses' tag in Swagger documentation
@Controller('warehouses')
@UseGuards(RolesGuard, AtGuard)
export class WarehousesController {
  constructor(private readonly warehousesService: WarehousesService) {}

  @Post('create')
  @Roles(Role.Admin) 
  create(@Body() createWarehouseDto: CreateWarehouseDto) {
    return this.warehousesService.create(createWarehouseDto);
  }

  @Get('all')
  @Roles(Role.Admin, Role.Manager, Role.Warehouse, Role.Supplier) 
  findAll() {
    return this.warehousesService.findAll();
  }

  @Get(':id')
  @Roles(Role.Admin, Role.Manager, Role.Warehouse, Role.Supplier)
  findOne(@Param('id') id: string) {
    return this.warehousesService.findOne(+id);
  }

  @Patch('update/:id')
  @Roles(Role.Admin, Role.Warehouse) 
  update(
    @Param('id') id: string,
    @Body() updateWarehouseDto: UpdateWarehouseDto,
  ) {
    return this.warehousesService.update(+id, updateWarehouseDto);
  }

  @Delete('delete/:id')
  @Roles(Role.Admin, Role.Warehouse)
  remove(@Param('id') id: string) {
    return this.warehousesService.remove(+id);
  }
}
