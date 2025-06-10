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
import { PricingsService } from './pricings.service';
import { CreatePricingDto } from './dto/create-pricing.dto';
import { UpdatePricingDto } from './dto/update-pricing.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/role.decorators';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AtGuard } from 'src/auth/guards/at.guards';
import { Role } from 'src/users/dto/create-user.dto'

@ApiBearerAuth('access-token')
@ApiTags('Pricings') // This groups the endpoints under the 'Pricing' tag in Swagger documentation
@UseGuards(RolesGuard, AtGuard) 
export class PricingsController {
  constructor(private readonly pricingsService: PricingsService) {}

  @Post('create')
  @Roles(Role.Admin, Role.Manager, Role.Warehouse)
  create(@Body() createPricingDto: CreatePricingDto) {
    return this.pricingsService.create(createPricingDto);
  }

  @Get('all')
  @Roles(Role.Admin, Role.Manager, Role.Warehouse, Role.Sales)
  findAll() {
    return this.pricingsService.findAll();
  }

  @Get(':id')
  @Roles(Role.Admin, Role.Manager, Role.Warehouse, Role.Sales)
  findOne(@Param('id') id: string) {
    return this.pricingsService.findOne(+id);
  }

  @Patch('update/:id')
  @Roles(Role.Admin, Role.Manager, Role.Warehouse, Role.Sales)
  update(@Param('id') id: string, @Body() updatePricingDto: UpdatePricingDto) {
    return this.pricingsService.update(+id, updatePricingDto);
  }

  @Delete('delete/:id')
  @Roles(Role.Admin, Role.Manager, Role.Warehouse, Role.Sales)
  remove(@Param('id') id: string) {
    return this.pricingsService.remove(+id);
  }
}
