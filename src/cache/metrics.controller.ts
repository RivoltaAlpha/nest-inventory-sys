import { Controller, Get } from '@nestjs/common';
import Redis from 'ioredis';
import { config } from 'dotenv';


// monitoring cache metrics
config({
  path: ['.env', '.env.production', '.env.local'],
});

const redis = new Redis(process.env.REDIS_URL as string);

@Controller('cache-metrics')
export class CacheMetricsController {
    

  @Get('')
  async getMetrics() {
    const info = await redis.info('stats');
    const memory = await redis.info('memory');
    const dbsize = await redis.dbsize();

    // Parse info for hits/misses
    const hits = parseInt(/keyspace_hits:(\d+)/.exec(info)?.[1] ?? '0', 10);
    const misses = parseInt(/keyspace_misses:(\d+)/.exec(info)?.[1] ?? '0', 10);
    const hitRatio = hits + misses > 0 ? hits / (hits + misses) : 0;

    return {
      hits,
      misses,
      hitRatio,
      dbsize,
      memory,
    };
  }
}