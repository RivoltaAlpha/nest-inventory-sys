import { IsEmail, IsNotEmpty, IsString, IsDate, IsEnum, IsNumber } from 'class-validator';

  // ENUM('Admin', 'Manager', 'Warehouse', 'Sales', 'Supplier'
 export enum Role{
    Admin = 'Admin',
    Manager = 'Manager',
    Warehouse = 'Warehouse',
    Sales = 'Sales',
    Supplier = 'Supplier'
  }
export class CreateUserDto {
  @IsNotEmpty()
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

  @IsString()
  @IsEnum(Role)
  role: Role;

  @IsDate()
  created_at: Date;

  @IsDate()
  updated_at: Date;
}
