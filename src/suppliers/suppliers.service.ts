import { Injectable } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Supplier } from './entities/supplier.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(Supplier)
    private suppliersRepository: Repository<Supplier>,
  ) {}
  create(createSupplierDto: CreateSupplierDto) {
    const supplier = this.suppliersRepository.create(createSupplierDto);
    return this.suppliersRepository.save(supplier);
  }

  findAll() {
    return this.suppliersRepository.find();
  }

  findOne(id: number) {
    return this.suppliersRepository.findOneBy({ supplier_id: id });
  }

  update(id: number, updateSupplierDto: UpdateSupplierDto) {
    return this.suppliersRepository.update(id, updateSupplierDto);
  }

  remove(id: number) {
    return this.suppliersRepository.delete(id);
  }
  // supplier products
  async supplierProducts(supplier_id: number) {
    return this.suppliersRepository.find({
      where: {
        supplier_id: supplier_id
      },
      relations: ['products'],
      select: {
        supplier_id: true,
        name: true,
        contact_info: true,
        products: {
          product_id: true,
          name: true,
          price: true,
        },
      }
    });
  }

  // supplier orders

  // supplier inventory
  
  // supplier categories

}
