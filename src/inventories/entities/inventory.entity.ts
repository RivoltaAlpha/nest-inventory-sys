import { Product } from 'src/products/entities/product.entity';
import { Warehouse } from 'src/warehouses/entities/warehouse.entity';
import { Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export class Inventory {
  @PrimaryGeneratedColumn()
  inventory_id: number;

  @Column({ type: 'int' })
  stock_qty: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @OneToMany(() => Product, (product) => product.inventory_id)
  products: Product[];

  @OneToMany(() => Warehouse, (warehouse) => warehouse.inventory_id)
  warehouses: Warehouse[];

  product_id: number;
  warehouse_id: number;
}
