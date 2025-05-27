import { IsNotEmpty, IsString, IsDate, IsNumber } from 'class-validator';

export class CreateProductDto {
    @IsNumber()
    product_id: number;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsNumber()
    sku: number;
    
    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @IsNumber()
    category_id: number;

    @IsNotEmpty()
    @IsNumber()
    supplier_id: number;
    
    @IsDate()
    created_at: Date;

    @IsDate()
    updated_at: Date;
}
