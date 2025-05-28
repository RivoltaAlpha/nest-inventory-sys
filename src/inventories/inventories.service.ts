import { Injectable } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventory } from './entities/inventory.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InventoriesService {
  constructor(
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
  ) {}

  create(createInventoryDto: CreateInventoryDto) {
    const inventory = this.inventoryRepository.create(createInventoryDto);
    return this.inventoryRepository.save(inventory);
  }

  findAll() {
    return this.inventoryRepository.find();
  }

  findOne(id: number) {
    return this.inventoryRepository.findOneBy({ inventory_id: id });
  }

  update(id: number, updateInventoryDto: UpdateInventoryDto) {
    return this.inventoryRepository.update(id, updateInventoryDto);
  }

  remove(id: number) {
    return this.inventoryRepository.delete(id);
  }
}
