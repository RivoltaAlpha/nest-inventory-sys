import { Product } from 'src/products/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class Pricing {
  @PrimaryGeneratedColumn()
  pricing_id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  discount: number;

  @Column({ type: 'varchar', length: 255 })
  promotion: string;

  @Column({ type: 'timestamp' })
  start_date: Date;

  @Column({ type: 'timestamp' })
  end_date: Date;

  @ManyToOne(() => Product, (product) => product.PricingAdjustment, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
