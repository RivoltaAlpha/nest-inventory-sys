import { Order } from 'src/orders/entities/order.entity';
import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Return {
  @PrimaryGeneratedColumn()
  return_id: number;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'varchar', length: 255 })
  return_reason: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToOne(() => Order, (order) => order.returnEntity, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  order: Order;
  @OneToOne(() => Product, (product) => product.returnEntity, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  product: Product;
}
