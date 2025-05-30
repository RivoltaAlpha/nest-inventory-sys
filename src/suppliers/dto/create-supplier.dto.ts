import {
  IsNotEmpty,
  IsString,
  IsDate,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateSupplierDto {
  @IsOptional()
  @IsNumber()
  supplier_id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  contact_info: string;

  @IsDate()
  @IsOptional()
  created_at: Date;
}
