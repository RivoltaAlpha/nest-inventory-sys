import { Injectable } from '@nestjs/common';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Warehouse } from './entities/warehouse.entity';
import { Repository } from 'typeorm';
import { Order } from 'src/orders/entities/order.entity';

@Injectable()
export class WarehousesService {
  constructor(
    @InjectRepository(Warehouse)
    private warehousesRepository: Repository<Warehouse>,
    @InjectRepository(Order) 
    private ordersRepository: Repository<Order>, 
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
      relations: ['inventories', 'inventories.product'],
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
  async warehouseProducts(warehouse_id: number) {
  const warehouse = await this.warehousesRepository.findOne({
    where: { warehouse_id },
    relations: ['inventories', 'inventories.product'],
  });
  console.log(warehouse);

  // Flatten and deduplicate products
  const productsMap = new Map();
  warehouse?.inventories?.forEach(inv => {
    if (inv.product) {
      productsMap.set(inv.product.product_id, inv.product);
    }
  });
  return Array.from(productsMap.values());
}

  // warehouse orders
  async warehouseOrders(warehouse_id: number) {
  // Get all product IDs in this warehouse
  const warehouse = await this.warehousesRepository.findOne({
    where: { warehouse_id },
    relations: ['inventories', 'inventories.product'],
  });

  const productIds = warehouse?.inventories?.map(inv => inv.product?.product_id).filter(Boolean);

  if (!productIds || productIds.length === 0) return [];

  return this.ordersRepository
    .createQueryBuilder('order')
    .leftJoinAndSelect('order.orderItems', 'orderItem')
    .leftJoinAndSelect('orderItem.product', 'product')
    .where('orderItem.product_id IN (:...productIds)', { productIds })
    .getMany();
}
  // warehouse suppliers
  async warehouseSuppliers(warehouse_id: number) {
  const warehouse = await this.warehousesRepository.findOne({
    where: { warehouse_id },
    relations: ['inventories', 'inventories.product', 'inventories.product.supplier'],
  });

  const suppliersMap = new Map();
  warehouse?.inventories?.forEach(inv => {
    if (inv.product?.supplier) {
      suppliersMap.set(inv.product.supplier.supplier_id, inv.product.supplier);
    }
  });
  return Array.from(suppliersMap.values());
}
}