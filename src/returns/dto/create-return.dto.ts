import { IsNotEmpty, IsDate, IsNumber, IsString } from 'class-validator';

export class CreateReturnDto {
  @IsNotEmpty()
  @IsNumber()
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
  created_at: Date;
}
