import { Category } from 'src/categories/entities/category.entity';
import { Inventory } from 'src/inventories/entities/inventory.entity';
import { Supplier } from 'src/suppliers/entities/supplier.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Warehouse } from 'src/warehouses/entities/warehouse.entity';
import { Column, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { Return } from 'src/returns/entities/return.entity';
import { Pricing } from 'src/pricings/entities/pricing.entity';

export class Product {
  @PrimaryGeneratedColumn()
  product_id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'int', unique: true })
  sku: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ManyToOne(() => Category, (category) => category.products, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  category: Category;

  @ManyToOne(() => Supplier, (supplier) => supplier.products, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  supplier: Supplier;

  @OneToMany(() => Inventory, (inventory) => inventory.product)
  inventories: Inventory[];

  @ManyToMany(() => Order, (order) => order.products)
  @JoinTable()
  orders: Relation<Order>[];

  @OneToOne(() => Return, (returnEntity) => returnEntity.product)
  returnEntity: Return;

  @OneToMany(() => Pricing, (PricingAdjustment) => PricingAdjustment.product)
  PricingAdjustment: Pricing[];

}
