import { Module } from '@nestjs/common';
import { CachemanagerService } from './cachemanager.service';
import { CachemanagerController } from './cachemanager.controller';

@Module({
  controllers: [CachemanagerController],
  providers: [CachemanagerService],
})
export class CachemanagerModule {}
