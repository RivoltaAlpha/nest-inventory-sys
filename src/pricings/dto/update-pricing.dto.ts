import { PartialType } from '@nestjs/mapped-types';
import { CreatePricingDto } from './create-pricing.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePricingDto extends PartialType(CreatePricingDto) {
      @ApiPropertyOptional()
      pricing_id: number;

      @ApiPropertyOptional()
      product_id: number;

      @ApiPropertyOptional()
      discount: number;

      @ApiPropertyOptional()
      promotion: string;

      @ApiPropertyOptional()
      start_date: Date;

      @ApiPropertyOptional()
      end_date: Date;
}
