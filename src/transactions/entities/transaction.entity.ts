import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum TransactionType {
  Sale = 'Sale',
  Purchase = 'Purchase',
  Return = 'Return',
  Adjustment = 'Adjustment',
}
@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  transaction_id: number;

  // @Column({ type: 'int' })
  // product_id: number;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({
    type: 'enum',
    enum: TransactionType,
  })
  type: TransactionType;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToOne(() => Transaction, transaction => transaction.product, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  product: Product;

}
