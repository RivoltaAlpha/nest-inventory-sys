import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsDate,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateSupplierDto {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  supplier_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  contact_info: string;

  @ApiProperty()
  @IsDate()
  @IsOptional()
  created_at: Date;
}
