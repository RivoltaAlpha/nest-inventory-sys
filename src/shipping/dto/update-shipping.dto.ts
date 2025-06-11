import { PartialType } from '@nestjs/mapped-types';
import { CreateShippingDto, ShippingStatus } from './create-shipping.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateShippingDto extends PartialType(CreateShippingDto) {
      @ApiPropertyOptional()
      shipping_id: number;

      @ApiPropertyOptional()
      order_id: number;

      @ApiPropertyOptional()
      tracking_number: string;

      @ApiPropertyOptional()
      status: ShippingStatus;

      @ApiPropertyOptional()
      shipped_at: Date;

      @ApiPropertyOptional()
      created_at: Date;
}
