import { Injectable } from '@nestjs/common';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Warehouse } from './entities/warehouse.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WarehousesService {
  constructor(
    @InjectRepository(Warehouse)
    private warehousesRepository: Repository<Warehouse>,
  ) {}
  create(createWarehouseDto: CreateWarehouseDto) {
    const warehouse = this.warehousesRepository.create(createWarehouseDto);
    return this.warehousesRepository.save(warehouse);
  }

  findAll() {
    return this.warehousesRepository.find();
  }

  findOne(id: number) {
    return this.warehousesRepository.findOneBy({ warehouse_id: id });
  }

  update(id: number, updateWarehouseDto: UpdateWarehouseDto) {
    return this.warehousesRepository.update(id, updateWarehouseDto);
  }

  remove(id: number) {
    return this.warehousesRepository.delete(id);
  }

  // warehouse inventories
  async warehouseInventories(warehouse_id: number) {
    return this.warehousesRepository.find({
      where: {
        warehouse_id: warehouse_id
      },
      relations: ['inventories'],
      select: {
        warehouse_id: true,
        name: true,
        location: true,
        inventories: {
          inventory_id: true,
          stock_qty: true,
          product: {
            product_id: true,
            name: true,
            price: true,
          },
        },
      }
    });
  }

  // warehouse products
  // warehouse orders
  // warehouse suppliers

}
