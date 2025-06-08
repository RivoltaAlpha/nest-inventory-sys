import { Injectable } from '@nestjs/common';
import { CreateShippingDto } from './dto/create-shipping.dto';
import { UpdateShippingDto } from './dto/update-shipping.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Shipping, ShippingStatus } from './entities/shipping.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ShippingService {
  constructor(
    @InjectRepository(Shipping)
    private shippingRepository: Repository<Shipping>,
  ) {}

  create(createShippingDto: CreateShippingDto) {
    const shipping = this.shippingRepository.create(createShippingDto);
    return this.shippingRepository.save(shipping);
  }

  findAll() {
    return this.shippingRepository.find();
  }

  findOne(id: number) {
    return this.shippingRepository.findOne({ where: { shipping_id: id } });
  }

  update(id: number, updateShippingDto: UpdateShippingDto) {
    return this.shippingRepository.update(id, updateShippingDto);
  }

  remove(id: number) {
    return this.shippingRepository.delete(id);
  }

  // shipping status filter
  async filterByStatus(status: string) {
    return this.shippingRepository.find({
      where: { status: status as ShippingStatus},
      select: {
        shipping_id: true,
        order: {
          order_id: true,
          total_price: true,
          status: true,
        },
      },
    });
  }
}
