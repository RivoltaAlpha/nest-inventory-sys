import { Product } from 'src/products/entities/product.entity';
import { Return } from 'src/returns/entities/return.entity';
import { Shipping } from 'src/shipping/entities/shipping.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
// ENUM('Pending', 'Completed', 'Shipped', 'Returned')
export enum OrderStatus {
  Pending = 'Pending',
  Completed = 'Completed',
  Shipped = 'Shipped',
  Returned = 'Returned',
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  order_id: number;

  // @Column({ type: 'int' })
  // user_id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total_price: number;

  @Column({ type: 'enum', enum: OrderStatus })
  status: OrderStatus;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne(() => Shipping, (shipping) => shipping.shipping_id, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  shipping: Relation<Shipping>;

  @ManyToMany(() => Product, (product) => product.orders)
  @JoinTable()
  products: Relation<Product>[];

  @OneToMany(() => Shipping, (shipping) => shipping.order)
  ShippingRecord : Relation<Shipping>[];

  @OneToOne(() => Return, (returnEntity) => returnEntity.order)
  returnEntity: Return;
}
