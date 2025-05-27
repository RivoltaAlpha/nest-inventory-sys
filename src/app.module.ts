import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { TransactionsModule } from './transactions/transactions.module';
import { WarehousesModule } from './warehouses/warehouses.module';
import { InventoriesModule } from './inventories/inventories.module';
import { ShippingModule } from './shipping/shipping.module';
import { PricingsModule } from './pricings/pricings.module';
import { ReturnsModule } from './returns/returns.module';

@Module({
  imports: [UsersModule, ProductsModule, SuppliersModule, CategoriesModule, OrdersModule, TransactionsModule, WarehousesModule, InventoriesModule, ShippingModule, PricingsModule, ReturnsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
