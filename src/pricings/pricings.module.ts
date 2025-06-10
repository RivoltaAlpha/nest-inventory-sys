import { Module } from '@nestjs/common';
import { PricingsService } from './pricings.service';
import { PricingsController } from './pricings.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pricing } from './entities/pricing.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Pricing, User])],
  controllers: [PricingsController],
  providers: [PricingsService],
})
export class PricingsModule {}
