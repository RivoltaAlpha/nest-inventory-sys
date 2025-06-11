import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsDate,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  product_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  sku: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  category_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  supplier_id: number;

  @ApiProperty()
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  created_at: Date;

  @ApiProperty()
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  updated_at: Date;
}
