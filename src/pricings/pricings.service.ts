import { Injectable } from '@nestjs/common';
import { CreatePricingDto } from './dto/create-pricing.dto';
import { UpdatePricingDto } from './dto/update-pricing.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pricing } from './entities/pricing.entity';

@Injectable()
export class PricingsService {
  constructor(
    @InjectRepository(Pricing)
    private pricingRepository: Repository<Pricing>,
  ) {}
  create(createPricingDto: CreatePricingDto) {
    const newPricing = this.pricingRepository.create(createPricingDto);
    return this.pricingRepository.save(newPricing);
  }

  findAll() {
    return this.pricingRepository.find();
  }

  findOne(id: number) {
    return this.pricingRepository.findOne({
      where: { pricing_id: id as number },
    });
  }

  update(id: number, updatePricingDto: UpdatePricingDto) {
    return this.pricingRepository.update(id, updatePricingDto);
  }

  remove(id: number) {
    return this.pricingRepository.delete(id);
  }
}
