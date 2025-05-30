import {
  IsNotEmpty,
  IsString,
  IsDate,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateWarehouseDto {
  @IsOptional()
  @IsNumber()
  warehouse_id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsDate()
  @IsOptional()
  created_at: Date;
}
