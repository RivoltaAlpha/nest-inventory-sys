import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/role.decorators';
import { Role } from 'src/users/dto/create-user.dto'; 

@ApiBearerAuth('access-token')
@ApiTags('Orders') // This groups the endpoints under the 'Orders' tag in Swagger documentation
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('create')
  @Roles( Role.Sales, Role.Admin, Role.Manager) 
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get('all')
  @Roles(Role.Admin, Role.Manager, Role.Sales, Role.Warehouse) 
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  @Roles(Role.Admin, Role.Manager, Role.Sales, Role.Warehouse, Role.Supplier)
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Patch('update/:id')
  @Roles(Role.Admin, Role.Manager, Role.Sales, Role.Warehouse)
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete('delete/:id')
  @Roles(Role.Admin, Role.Manager, Role.Sales, Role.Warehouse)
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
  @Get('user/:userId')
  @Roles(Role.Admin, Role.Manager, Role.Sales, Role.Warehouse, Role.Supplier)
  findByUser(@Param('userId') userId: number) {
    return this.ordersService.findByUser(userId);
  }
  @Get('status/:Pending')
  @Roles(Role.Admin, Role.Manager, Role.Sales, Role.Warehouse, Role.Supplier)
  getStatus(@Param('Pending') Pending: string) {
    return this.ordersService.getStatus(Pending);
  }
}
