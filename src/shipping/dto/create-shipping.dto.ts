import { IsNotEmpty, IsDate, IsNumber, IsEnum, IsString } from 'class-validator';
// ENUM('Pending', 'Shipped', 'Delivered', 'Cancelled')
export enum ShippingStatus {
    Pending = 'Pending',
    Shipped = 'Shipped',
    Delivered = 'Delivered',
    Cancelled = 'Cancelled',
};

export class CreateShippingDto {
    @IsNotEmpty()
    @IsNumber()
    shipping_id: number;

    @IsNotEmpty()
    @IsNumber()
    order_id: number;

    @IsNotEmpty()
    @IsNumber()
    tracking_number: number;

    @IsNotEmpty()
    @IsString()
    @IsEnum(ShippingStatus)
    status: ShippingStatus;

    @IsNotEmpty()
    @IsDate()
    shipped_at: Date;

    @IsNotEmpty()
    @IsDate()
    created_at: Date;
}
