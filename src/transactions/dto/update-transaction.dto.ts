import { PartialType } from '@nestjs/mapped-types';
import { CreateTransactionDto, TransactionType } from './create-transaction.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {
      @ApiPropertyOptional()
      transaction_id: number;

      @ApiPropertyOptional()
      product_id: number;

      @ApiPropertyOptional()
      quantity: number;

      @ApiPropertyOptional()
      price: number;

      @ApiPropertyOptional()
      type: TransactionType;

      @ApiPropertyOptional()
      created_at: Date;
}
