import { PartialType } from '@nestjs/mapped-types';
import { CreateSupplierDto } from './create-supplier.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateSupplierDto extends PartialType(CreateSupplierDto) {
      @ApiPropertyOptional()
      supplier_id: number;

      @ApiPropertyOptional()
      name: string;

      @ApiPropertyOptional()
      contact_info: string;

      @ApiPropertyOptional()
      created_at: Date;
}
