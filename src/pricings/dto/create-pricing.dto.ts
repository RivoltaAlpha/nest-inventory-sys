import { IsNotEmpty, IsDate, IsNumber, IsString } from 'class-validator';

export class CreatePricingDto {
    @IsNotEmpty()
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
    @IsDate()
    start_date: Date;

    @IsNotEmpty()
    @IsDate()
    end_date: Date;
}
