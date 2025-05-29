import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { Product } from 'src/products/entities/product.entity';
import { Supplier } from 'src/suppliers/entities/supplier.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Inventory } from 'src/inventories/entities/inventory.entity';
import { Warehouse } from 'src/warehouses/entities/warehouse.entity';
import { Return } from 'src/returns/entities/return.entity';
import { Pricing } from 'src/pricings/entities/pricing.entity';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Category, Product, Supplier, Order, Inventory, Warehouse, Transaction, Return, Pricing])], // Add your entities here
  providers: [SeedService],
  controllers: [SeedController]
})
export class SeedModule {}
