import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionsRepository: Repository<Transaction>,
  ) {}

  create(createTransactionDto: CreateTransactionDto) {
    return this.transactionsRepository.save(createTransactionDto);
  }

  findAll() {
    return this.transactionsRepository.find();
  }

  findOne(id: number) {
    return this.transactionsRepository.findOne({
      where: { transaction_id: id },
    });
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return this.transactionsRepository.update(id, updateTransactionDto);
  }

  remove(id: number) {
    return this.transactionsRepository.delete(id);
  }
}
