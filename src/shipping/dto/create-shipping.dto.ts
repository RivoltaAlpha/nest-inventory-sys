import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
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
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  shipping_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  order_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  tracking_number: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEnum(ShippingStatus)
  status: ShippingStatus;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  shipped_at: Date;

  @ApiProperty()
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  created_at: Date;
}
