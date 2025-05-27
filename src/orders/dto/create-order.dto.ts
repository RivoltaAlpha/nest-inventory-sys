import { IsNotEmpty, IsString, IsDate, IsEnum, IsNumber } from 'class-validator';
// ENUM('Pending', 'Completed', 'Shipped', 'Returned')
export enum OrderStatus {
    Pending = 'Pending',
    Completed = 'Completed',
    Shipped = 'Shipped',
    Returned = 'Returned',
}

export class CreateOrderDto {

  @IsNumber()
    order_id: number;

    @IsNotEmpty()
    @IsNumber()
    user_id: number;

    @IsNotEmpty()
    @IsNumber()
    total_price: number;

    @IsNotEmpty()
    @IsString()
    @IsEnum(OrderStatus)
    status: OrderStatus;

    @IsDate()
    created_at: Date;

    @IsDate()
    updated_at: Date;
}
