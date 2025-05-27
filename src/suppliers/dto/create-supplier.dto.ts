import { IsNotEmpty, IsString, IsDate, IsNumber } from 'class-validator';

export class CreateSupplierDto {
    @IsNumber()
    supplier_id: number;
    
    @IsNotEmpty()
    @IsString()
    name: string;
    
    @IsNotEmpty()
    @IsString()
    contact_info: string;
    
    @IsDate()
    created_at: Date;
}
