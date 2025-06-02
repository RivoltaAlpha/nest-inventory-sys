import { Order } from 'src/orders/entities/order.entity';
import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

export enum ShippingStatus {
  Pending = 'Pending',
  Shipped = 'Shipped',
  Delivered = 'Delivered',
  Cancelled = 'Cancelled',
}

@Entity()
export class Shipping {
  @PrimaryGeneratedColumn()
  shipping_id: number;

  @Column({ type: 'varchar', length: 255 })
  tracking_number: string;

  @Column({
    type: 'enum',
    enum: ShippingStatus,
  })
  status: ShippingStatus;

  @Column({ type: 'timestamp' })
  shipped_at: Date;

  @Column({ type: 'timestamp' })
  created_at: Date;

  @OneToOne(() => Order, (order) => order.shipping)
  order: Relation<Order>;
}
