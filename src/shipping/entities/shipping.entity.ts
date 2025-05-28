import { Order } from 'src/orders/entities/order.entity';
import { Column, OneToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';

export enum ShippingStatus {
  Pending = 'Pending',
  Shipped = 'Shipped',
  Delivered = 'Delivered',
  Cancelled = 'Cancelled',
}

export class Shipping {
  @PrimaryGeneratedColumn()
  shipping_id: number;

  @Column()
  tracking_number: string;

  @Column({
    type: 'enum',
    enum: ShippingStatus,
  })
  status: ShippingStatus;

  @Column()
  shipped_at: Date;

  @Column()
  created_at: Date;

  @OneToOne(() => Order, (order) => order.order_id)
  order: Relation<Order>;
}
