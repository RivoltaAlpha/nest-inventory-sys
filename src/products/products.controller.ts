import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/role.decorators';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AtGuard } from 'src/auth/guards/at.guards';
import { Role } from 'src/users/dto/create-user.dto'; 

@Controller('products')
@ApiTags('Products') // This groups the endpoints under the 'Products' tag in Swagger documentation
@UseGuards(RolesGuard, AtGuard) // This applies the RolesGuard to all endpoints in this controller
@UseInterceptors(CacheInterceptor)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('create')
  @Roles(Role.Admin, Role.Manager, Role.Warehouse) 
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get('all')
  @Roles(Role.Admin, Role.Manager, Role.Warehouse, Role.Sales) 
  // Cache this endpoint for 5 minutes
  @CacheTTL(50000)
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @Roles(Role.Admin, Role.Manager, Role.Warehouse, Role.Sales)
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch('update/:id')
  @Roles(Role.Admin, Role.Manager, Role.Warehouse)
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete('delete/:id')
  @Roles(Role.Admin, Role.Manager, Role.Warehouse)
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
