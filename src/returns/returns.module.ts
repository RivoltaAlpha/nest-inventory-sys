import { Module } from '@nestjs/common';
import { ReturnsService } from './returns.service';
import { ReturnsController } from './returns.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Return } from './entities/return.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Return])],
  controllers: [ReturnsController],
  providers: [ReturnsService],
})
export class ReturnsModule {}
