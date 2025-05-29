import {
  IsNotEmpty,
  IsDate,
  IsNumber,
  IsEnum,
  IsString,
  IsOptional,
} from 'class-validator';
// ENUM('Pending', 'Shipped', 'Delivered', 'Cancelled')
export enum ShippingStatus {
  Pending = 'Pending',
  Shipped = 'Shipped',
  Delivered = 'Delivered',
  Cancelled = 'Cancelled',
}

export class CreateShippingDto {
  @IsOptional()
  @IsNumber()
  shipping_id: number;

  @IsNotEmpty()
  @IsNumber()
  order_id: number;

  @IsNotEmpty()
  @IsString()
  tracking_number: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(ShippingStatus)
  status: ShippingStatus;

  @IsNotEmpty()
  @IsDate()
  shipped_at: Date;

  @IsNotEmpty()
  @IsDate()
  created_at: Date;
}
