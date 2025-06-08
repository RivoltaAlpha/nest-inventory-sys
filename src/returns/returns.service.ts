import { Injectable } from '@nestjs/common';
import { CreateReturnDto } from './dto/create-return.dto';
import { UpdateReturnDto } from './dto/update-return.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Return } from './entities/return.entity';

@Injectable()
export class ReturnsService {
  constructor(
    @InjectRepository(Return)
    private returnsRepository: Repository<Return>,
  ) {}

  create(createReturnDto: CreateReturnDto) {
    const newReturn = this.returnsRepository.create(createReturnDto);
    return this.returnsRepository.save(newReturn);
  }

  findAll() {
    return this.returnsRepository.find();
  }

  findOne(id: number) {
    return this.returnsRepository.findOne({
      where: { return_id: id },
    });
  }

  update(id: number, updateReturnDto: UpdateReturnDto) {
    return this.returnsRepository.update(id, updateReturnDto);
  }

  remove(id: number) {
    return this.returnsRepository.delete(id);
  }

  // return and update 
}
