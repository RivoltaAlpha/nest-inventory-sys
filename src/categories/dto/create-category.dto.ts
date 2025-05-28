import { IsNotEmpty, IsString, IsDate, IsNumber, IsOptional } from 'class-validator';

export class CreateCategoryDto {
    @IsOptional()
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
