import { IsNotEmpty, IsString, IsDate, IsNumber } from 'class-validator';

export class CreateWarehouseDto {
    @IsNumber()
    warehouse_id: number;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    location: string;

    @IsDate()
    created_at: Date;
}
