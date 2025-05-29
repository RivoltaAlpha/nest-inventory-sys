import {
  IsNotEmpty,
  IsString,
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
} from 'class-validator';

// ENUM('Sale', 'Purchase', 'Return', 'Adjustment')
export enum TransactionType {
  Sale = 'Sale',
  Purchase = 'Purchase',
  Return = 'Return',
  Adjustment = 'Adjustment',
}

export class CreateTransactionDto {
  @IsOptional()
  @IsNumber()
  transaction_id: number;

  @IsNotEmpty()
  @IsNumber()
  product_id: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  @IsEnum(TransactionType)
  type: TransactionType;

  @IsNotEmpty()
  @IsDate()
  created_at: Date;
}
