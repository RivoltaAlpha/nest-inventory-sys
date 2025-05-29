import { Module } from '@nestjs/common';
import { PricingsService } from './pricings.service';
import { PricingsController } from './pricings.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pricing } from './entities/pricing.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Pricing])],
  controllers: [PricingsController],
  providers: [PricingsService],
})
export class PricingsModule {}
