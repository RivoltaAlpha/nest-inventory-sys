import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
} from 'class-validator';

// ENUM('Admin', 'Manager', 'Warehouse', 'Sales', 'Supplier'
export enum Role {
  Admin = 'Admin',
  Manager = 'Manager',
  Warehouse = 'Warehouse',
  Sales = 'Sales',
  Supplier = 'Supplier',
}
export class CreateUserDto {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  user_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEnum(Role)
  role: Role;

    @ApiProperty()
  @IsOptional()
  @IsString()
  hashedRefreshToken?: string;

    @ApiProperty()
  @IsOptional()
  @IsDate()
  created_at: Date;

    @ApiProperty()
  @IsOptional()
  @IsDate()
  updated_at: Date;
}
