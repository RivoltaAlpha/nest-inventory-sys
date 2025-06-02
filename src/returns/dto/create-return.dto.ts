import {
  IsNotEmpty,
  IsDate,
  IsNumber,
  IsString,
  IsOptional,
} from 'class-validator';

export class CreateReturnDto {
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  return_id: number;

  @IsNotEmpty()
  @IsNumber()
  order_id: number;

  @IsNotEmpty()
  @IsNumber()
  product_id: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsString()
  return_reason: string;

  @IsDate()
  @IsOptional()
  created_at: Date;
}
