import { Controller, Post, HttpStatus, HttpCode, Logger } from '@nestjs/common';
import { SeedService } from './seed.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('seed')
@ApiTags('Seeding') // This groups the endpoints under the 'Seeding' tag in Swagger documentation
export class SeedController {
  private readonly logger = new Logger(SeedController.name);

  constructor(private readonly seedService: SeedService) {}
  @Public()
  @Post()
  @HttpCode(HttpStatus.OK)
  async seed() {
    this.logger.log('Seed endpoint called');
    return this.seedService.seed();
  }
}
