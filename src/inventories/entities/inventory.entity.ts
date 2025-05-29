import { Product } from 'src/products/entities/product.entity';
import { Warehouse } from 'src/warehouses/entities/warehouse.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Inventory {
  @PrimaryGeneratedColumn()
  inventory_id: number;

  @Column({ type: 'int' })
  stock_qty: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ManyToOne(() => Product, (product) => product.inventories, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  product: Product;

  @ManyToOne(() => Warehouse, (warehouse) => warehouse.inventories, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  warehouse: Warehouse;

  // product_id: number;


  // warehouse_id: number;
}
