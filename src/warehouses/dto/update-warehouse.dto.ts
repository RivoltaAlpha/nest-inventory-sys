import { PartialType } from '@nestjs/mapped-types';
import { CreateWarehouseDto } from './create-warehouse.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateWarehouseDto extends PartialType(CreateWarehouseDto) {
      @ApiPropertyOptional()
      warehouse_id: number;

      @ApiPropertyOptional()
      name: string;

      @ApiPropertyOptional()
      location: string;

      @ApiPropertyOptional()
      created_at: Date;
}
