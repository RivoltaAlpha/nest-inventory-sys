import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CachemanagerService } from './cachemanager.service';


@Controller('cache')
export class CachemanagerController {
  constructor(private readonly cachemanagerService: CachemanagerService) {}

  @Post()
  @Get(':key')
  get(@Param('key') key: string) {
    return this.cachemanagerService.get(key);
  }
  @Post('')
  set(@Param('key') key: string, @Body() value: any) {
    return this.cachemanagerService.set(key, value);
  }
  @Delete(':key')
  delete(@Param('key') key: string) {
    return this.cachemanagerService.delete(key);
  }

}