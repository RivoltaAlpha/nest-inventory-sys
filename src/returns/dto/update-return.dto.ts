import { PartialType } from '@nestjs/mapped-types';
import { CreateReturnDto } from './create-return.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateReturnDto extends PartialType(CreateReturnDto) {
      @ApiPropertyOptional()
      return_id: number;

      @ApiPropertyOptional()
      order_id: number;

      @ApiPropertyOptional()
      product_id: number;

      @ApiPropertyOptional()
      quantity: number;

      @ApiPropertyOptional()
      return_reason: string;

      @ApiPropertyOptional()
      created_at: Date;
}
