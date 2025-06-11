import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { Inventory } from 'src/inventories/entities/inventory.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Product, User, Inventory])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
