# 1. Setup
Install the following dependencies:
```
npm install @nestjs/cache-manager cache-manager @keyv/redis cacheable
```

## 2. Environmental Confrigurations
```
# Redis configuration
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your_redis_password
REDIS_USERNAME=username

# Redis URL format
REDIS_URL=redis://username:your_redis_password@localhost:6379
```

## 3. Global Cache Module Setup
Configure cache module globally in app.module.ts:

```
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { CacheableMemory} from 'cacheable';
import { createKeyv, Keyv } from '@keyv/redis';


// Inside the app modules...
 CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      isGlobal: true, // Make cache globally available
      useFactory: (configService: ConfigService) => {
        return {
          ttl: 60000, // Default TTL for cache entries
          stores: [
            createKeyv(configService.getOrThrow<string>('REDIS_URL')),

            // Using CacheableMemory for in-memory caching
            new Keyv({
              store: new CacheableMemory({ ttl: 30000, lruSize: 5000 }),
            }),
          ],
        };
      },
    }),
```

```
providers: [
    {
      provide: 'APP_INTERCEPTOR',
      useClass: CacheInterceptor, // Global cache interceptor
    },
  ],
```


## Docker Set-up
 ``` 
 docker run -d --name my-redis-container -p 6379:6379 redis
 ```

or you can do 
###
```
# Redis configuration
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=pasword
REDIS_USERNAME=default

# Redis URL format
REDIS_URL = redis://default:password@localhost:6379
```

#### docker.compose.yml
```
version: '3.8'

services:

  redis:
      image: redis:8.0-alpine
      container_name: redis-cache
      restart: unless-stopped
      command: ["redis-server", "--requirepass", "${REDIS_PASSWORD}"]
      ports:
        - "6379:6379"
      volumes:
        - redis-data:/data
      networks:
        - app-network

volumes:
  redis-data:
    name: redis-cache-data
    driver: local

networks:
  app-network:
    driver: bridge
```

After this, create a database in Redis with a connection string as above.