import { Module } from '@nestjs/common';
import { WarehousesService } from './warehouses.service';
import { WarehousesController } from './warehouses.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Warehouse } from './entities/warehouse.entity';
import { User } from 'src/users/entities/user.entity';
import { Order } from 'src/orders/entities/order.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Warehouse,User, Order])],
  controllers: [WarehousesController],
  providers: [WarehousesService],
})
export class WarehousesModule {}
