import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsDate,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateWarehouseDto {
    @ApiProperty()
  @IsOptional()
  @IsNumber()
  warehouse_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  location: string;

  @ApiProperty()
  @IsDate()
  @IsOptional()
  created_at: Date;
}
