import { IsNotEmpty, IsDate, IsNumber, IsString, IsOptional } from 'class-validator';

export class CreatePricingDto {
  @IsOptional()
  @IsNumber()
  pricing_id: number;

  @IsNotEmpty()
  @IsNumber()
  product_id: number;

  @IsNotEmpty()
  @IsNumber()
  discount: number;

  @IsNotEmpty()
  @IsString()
  promotion: string;

  @IsNotEmpty()
   @IsOptional()
  @IsDate()
  start_date: Date;

  @IsNotEmpty()
  @IsDate()
  @IsOptional()
  end_date: Date;
}
