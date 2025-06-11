import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto, OrderStatus } from './create-order.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
      @ApiPropertyOptional()
      order_id: number;

      @ApiPropertyOptional()
      user_id: number;

      @ApiPropertyOptional()
      total_price: number;

      @ApiPropertyOptional()
      status: OrderStatus;

      @ApiPropertyOptional()
      created_at: Date;

      @ApiPropertyOptional()
      updated_at: Date;

      @ApiPropertyOptional()
      products: { product_id: number }[];
}
