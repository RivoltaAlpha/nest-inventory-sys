import { IsNotEmpty, IsDate, IsNumber, IsOptional, IsArray, ArrayNotEmpty } from 'class-validator';

export class CreateInventoryDto {
  @IsOptional()
  @IsNumber()
  inventory_id: number;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  products: number[];

  @IsNotEmpty()
  @IsNumber()
  warehouse_id: number;

  @IsNotEmpty()
  @IsNumber()
  stock_qty: number;

  @IsNotEmpty()
  @IsOptional()
  @IsDate()
  created_at: Date;
}
