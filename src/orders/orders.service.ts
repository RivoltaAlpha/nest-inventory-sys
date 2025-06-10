import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const order = this.ordersRepository.create({
      ...createOrderDto,
      user: { user_id: createOrderDto.user_id },
      products: createOrderDto.products.map((p) => ({
        product_id: p.product_id,
      })),
    });
    const savedOrder = await this.ordersRepository.save(order);

    // Fetch with relations
    return this.ordersRepository.findOne({
      where: { order_id: savedOrder.order_id },
      relations: ['user', 'products'],
      select: {
        order_id: true,
        total_price: true,
        status: true,
        user: {
          user_id: true,
          first_name: true,
          last_name: true,
          email: true,
        },
        products: {
          product_id: true,
          name: true,
          price: true,
        },
      },
    });
  }

  findAll() {
    return this.ordersRepository.find();
  }

  // query builder to select specific fields and relations
  async findOne(id: number) {
    return this.ordersRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'user')
      .select([
        'order',
        'user.user_id',
        'user.first_name',
        'user.last_name',
        'user.email',
      ])
      .leftJoinAndSelect('order.products', 'product')
      .leftJoinAndSelect('order.shipping', 'shipping')
      .leftJoinAndSelect('order.returnEntity', 'returnEntity')
      .where('order.order_id = :id', { id })
      .getOne();
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return this.ordersRepository.update(id, updateOrderDto);
  }

  remove(id: number) {
    return this.ordersRepository.delete(id);
  }

  // user orders 
  async findByUser(userId: number) {
    return this.ordersRepository.find({
      where: { user: { user_id: userId } },
      relations: ['user', 'products'],
      select: {
        order_id: true,
        total_price: true,
        status: true,
        user: {
          first_name: true,
          last_name: true,
          email: true,
        },
        products: {
          product_id: true,
          name: true,
          price: true,
        },
      },
    });
  }

    // filter order with status
  async getStatus(productStatus: string) {
    return this.ordersRepository.find({
      where: { status: productStatus as Order['status'] },
      relations: ['user', 'products'],
      select: {
        order_id: true,
        total_price: true,
        status: true,
        user: {
          first_name: true,
          last_name: true,
          email: true,
        },
        products: {
          product_id: true,
          name: true,
          price: true,
        },
      },
    });
  }
}
