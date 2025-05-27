import { IsNotEmpty, IsString, IsDate, IsNumber } from 'class-validator';


export class CreateCategoryDto {
    @IsNumber()
    supplier_id: number;
    
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;
    
    @IsDate()
    created_at: Date;
}
