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
  @IsOptional()
  @IsNumber()
  user_id: number;

  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(Role)
  role: Role;

  @IsOptional()
  @IsString()
  hashedRefreshToken: string;

  @IsOptional()
  @IsDate()
  created_at: Date;

  @IsOptional()
  @IsDate()
  updated_at: Date;
}
