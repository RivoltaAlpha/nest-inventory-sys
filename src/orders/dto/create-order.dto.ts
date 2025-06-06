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
  @IsOptional()
  @IsNumber()
  order_id: number;

  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @IsNotEmpty()
  @IsNumber()
  total_price: number;

  @IsNotEmpty()
  @IsString()
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @IsOptional()
  @IsDate()
  created_at: Date;

  @IsOptional()
  @IsDate()
  updated_at: Date;

    @IsNotEmpty()
  @IsOptional()
  products: { product_id: number }[];
}
