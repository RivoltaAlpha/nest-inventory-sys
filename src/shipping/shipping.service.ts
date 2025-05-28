import { Injectable } from '@nestjs/common';
import { CreateShippingDto } from './dto/create-shipping.dto';
import { UpdateShippingDto } from './dto/update-shipping.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Shipping } from './entities/shipping.entity';
import { Relation } from 'typeorm';

@Injectable()
export class ShippingService {
  constructor(
    @InjectRepository(Shipping)
    private shippingRepository: Relation<Shipping>,
  ) {}

  create(createShippingDto: CreateShippingDto) {
    const shipping = this.shippingRepository.create(createShippingDto);
    return this.shippingRepository.save(shipping);
  }

  findAll() {
    return this.shippingRepository.find();
  }

  findOne(id: number) {
    return this.shippingRepository.findOne(id);
  }

  update(id: number, updateShippingDto: UpdateShippingDto) {
    return this.shippingRepository.update(id, updateShippingDto);
  }

  remove(id: number) {
    return this.shippingRepository.delete(id);
  }
}
