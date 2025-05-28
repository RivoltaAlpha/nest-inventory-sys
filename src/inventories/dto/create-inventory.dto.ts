import { IsNotEmpty, IsDate, IsNumber, IsOptional } from 'class-validator';

export class CreateInventoryDto {
    @IsOptional()
    @IsNumber()
    inventory_id: number;

    @IsNotEmpty()
    @IsNumber()
    product_id: number;
    
    @IsNotEmpty()
    @IsNumber()
    warehouse_id: number;

    @IsNotEmpty()
    @IsNumber()
    stock_qty: number;

    @IsNotEmpty()
    @IsDate()
    created_at: Date;
}
