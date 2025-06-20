import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
// import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/role.decorators';
import { Role } from 'src/users/dto/create-user.dto'; 
import { Repository } from 'typeorm';
import { Inventory } from 'src/inventories/entities/inventory.entity';

@Controller('products')
@ApiTags('Products') // This groups the endpoints under the 'Products' tag in Swagger documentation
// @UseInterceptors(CacheInterceptor)
export class ProductsController {
  constructor(private readonly productsService: ProductsService,
  ) {}


  @Post('create')
  @Roles(Role.Admin, Role.Manager, Role.Warehouse) 
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get('all')
  @Roles(Role.Admin, Role.Manager, Role.Warehouse, Role.Sales) 
  // @CacheTTL(50000)  // Cache this endpoint for 5 minutes
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

  @Get('supplier/:supplierId')
  @Roles(Role.Supplier, Role.Admin)
  async findBySupplier(@Param('supplierId') supplierId: number) {
  return this.productsService.findBySupplier(supplierId);
}
}
