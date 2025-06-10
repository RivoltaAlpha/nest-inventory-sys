import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WarehousesService } from './warehouses.service';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/role.decorators';
import { Role } from 'src/users/dto/create-user.dto';

@ApiBearerAuth('access-token')
@ApiTags('Warehouses') // This groups the endpoints under the 'Warehouses' tag in Swagger documentation
@Controller('warehouses')
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

  @Get('inventories/:warehouse_id')
  @Roles(Role.Admin, Role.Manager, Role.Warehouse, Role.Supplier)
  warehouseInventories(@Param('warehouse_id') warehouse_id: string) {
    return this.warehousesService.warehouseInventories(+warehouse_id);
  }
  
    @Get('products/:warehouse_id')
    @Roles(Role.Admin, Role.Manager, Role.Warehouse, Role.Supplier)
    warehouseProducts(@Param('warehouse_id') warehouse_id: string) {
      return this.warehousesService.warehouseProducts(+warehouse_id);
    }

    // not working for now
  @Get('orders/:warehouse_id')
  @Roles(Role.Admin, Role.Manager, Role.Warehouse, Role.Supplier)
  warehouseOrders(@Param('warehouse_id') warehouse_id: string) {
    return this.warehousesService.warehouseOrders(+warehouse_id);
  }
}
