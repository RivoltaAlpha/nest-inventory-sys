import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProductDto extends PartialType(CreateProductDto) {
      @ApiPropertyOptional()
      product_id: number;

      @ApiPropertyOptional()
      name: string;

      @ApiPropertyOptional()
      description: string;

      @ApiPropertyOptional()
      sku: string;

      @ApiPropertyOptional()
      price: number;

      @ApiPropertyOptional()
      category_id: number;

      @ApiPropertyOptional()
      supplier_id: number;

      @ApiPropertyOptional()
      created_at: Date;

      @ApiPropertyOptional()
      updated_at: Date;
}
