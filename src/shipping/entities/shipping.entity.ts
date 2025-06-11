import { Order } from 'src/orders/entities/order.entity';
import {
  Column,
  Entity,
  JoinColumn,
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

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @OneToOne(() => Order, (order) => order.shipping, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'order_id' })
  order: Relation<Order>;
}
