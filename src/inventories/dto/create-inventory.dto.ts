import { IsNotEmpty, IsDate, IsNumber } from 'class-validator';

export class CreateInventoryDto {
    @IsNotEmpty()
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
