import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsDate,
  IsNumber,
  IsString,
  IsOptional,
} from 'class-validator';

export class CreateReturnDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  return_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  order_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  product_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  return_reason: string;

  @ApiProperty()
  @IsDate()
  @IsOptional()
  created_at: Date;
}
