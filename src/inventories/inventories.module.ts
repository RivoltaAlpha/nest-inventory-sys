import { Module } from '@nestjs/common';
import { InventoriesService } from './inventories.service';
import { InventoriesController } from './inventories.controller';
import { DatabaseModule } from 'src/database/database.module';
import { Inventory } from './entities/inventory.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Inventory])],
  controllers: [InventoriesController],
  providers: [InventoriesService],
})
export class InventoriesModule {}
