import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
} from 'class-validator';
// ENUM('Pending', 'Completed', 'Shipped', 'Returned')
export enum OrderStatus {
  Pending = 'Pending',
  Completed = 'Completed',
  Shipped = 'Shipped',
  Returned = 'Returned',
}

export class CreateOrderDto {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  order_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  total_price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  created_at: Date;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  updated_at: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  products: { product_id: number }[];
}
