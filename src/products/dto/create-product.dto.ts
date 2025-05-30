import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsDate,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateProductDto {
  @IsOptional()
  @IsNumber()
  product_id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  sku: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  category_id: number;

  @IsNotEmpty()
  @IsNumber()
  supplier_id: number;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  created_at: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  updated_at: Date;
}
