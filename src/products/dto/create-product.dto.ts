import { Type } from 'class-transformer';
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
    @Type(() => Date)
    created_at: Date;

    @IsDate()
    // apparently This ensures that ISO timestamp strings are correctly parsed as Date objects during validation and transformation.
    @Type(() => Date)
    updated_at: Date;
}
