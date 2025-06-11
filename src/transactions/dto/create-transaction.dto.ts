import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  transaction_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  product_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEnum(TransactionType)
  type: TransactionType;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  @IsDate()
  created_at: Date;
}
