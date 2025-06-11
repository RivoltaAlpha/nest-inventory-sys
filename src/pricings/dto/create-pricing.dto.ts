import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsDate,
  IsNumber,
  IsString,
  IsOptional,
} from 'class-validator';

export class CreatePricingDto {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  pricing_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  product_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  discount: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  promotion: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  @IsDate()
  start_date: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  @IsOptional()
  end_date: Date;
}
