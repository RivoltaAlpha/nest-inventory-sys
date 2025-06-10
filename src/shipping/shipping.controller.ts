import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ShippingService } from './shipping.service';
import { CreateShippingDto } from './dto/create-shipping.dto';
import { UpdateShippingDto } from './dto/update-shipping.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/role.decorators';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/users/dto/create-user.dto';
import { AtGuard } from 'src/auth/guards/at.guards';

@ApiBearerAuth('access-token')
@ApiTags('Shipping') // This groups the endpoints under the 'Shipping' tag in Swagger documentation
@Controller('shipping')
export class ShippingController {
  constructor(private readonly shippingService: ShippingService) {}

  @Post('create')
  @Roles(Role.Supplier, Role.Warehouse) // This endpoint is restricted to users with the 'supplier' or 'warehouse' role
  create(@Body() createShippingDto: CreateShippingDto) {
    return this.shippingService.create(createShippingDto);
  }

  @Get('all')
  @Roles(Role.Admin, Role.Manager, Role.Supplier, Role.Warehouse) // This endpoint is restricted to users with the 'admin', 'manager', 'supplier', or 'warehouse' role
  findAll() {
    return this.shippingService.findAll();
  }

  @Get(':id')
  @Roles(Role.Admin, Role.Manager, Role.Supplier, Role.Warehouse)
  findOne(@Param('id') id: string) {
    return this.shippingService.findOne(+id);
  }

  @Patch('update/:id')
  @Roles(Role.Admin, Role.Manager, Role.Supplier, Role.Warehouse)
  update(
    @Param('id') id: string,
    @Body() updateShippingDto: UpdateShippingDto,
  ) {
    return this.shippingService.update(+id, updateShippingDto);
  }

  @Delete('delete/:id')
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.shippingService.remove(+id);
  }
}
