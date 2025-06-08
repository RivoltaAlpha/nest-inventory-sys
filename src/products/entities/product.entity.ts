import { Category } from 'src/categories/entities/category.entity';
import { Inventory } from 'src/inventories/entities/inventory.entity';
import { Supplier } from 'src/suppliers/entities/supplier.entity';
import { Order } from 'src/orders/entities/order.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Return } from 'src/returns/entities/return.entity';
import { Pricing } from 'src/pricings/entities/pricing.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  product_id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'varchar', unique: true })
  sku: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  // holds the category_id as a foreign key
  @ManyToOne(() => Category, (category) => category.products, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  // holds the supplier_id as a foreign key
  @ManyToOne(() => Supplier, (supplier) => supplier.products, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'supplier_id' })
  supplier: Supplier;

  @OneToMany(() => Inventory, (inventory) => inventory.product)
  inventories: Inventory[];
  
  @OneToOne(() => Return, (returnEntity) => returnEntity.product)
  returnEntity: Return;
  
  @OneToMany(() => Pricing, (PricingAdjustment) => PricingAdjustment.product)
  PricingAdjustment: Pricing[];
  
  @ManyToMany(() => Order, (order) => order.products)
  orders: Relation<Order>[];
}
