import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { TransactionsModule } from './transactions/transactions.module';
import { WarehousesModule } from './warehouses/warehouses.module';
import { InventoriesModule } from './inventories/inventories.module';
import { ShippingModule } from './shipping/shipping.module';
import { PricingsModule } from './pricings/pricings.module';
import { ReturnsModule } from './returns/returns.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SeedModule } from './seed/seed.module';
import { LoggerMiddleware } from './logger.middleware';
import { LogsModule } from './logs/logs.module';
import { AppController } from './app.controller';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { CacheableMemory} from 'cacheable';
import { createKeyv, Keyv } from '@keyv/redis';
import { CacheMetricsController } from './cache/metrics.controller';
import { CachemanagerModule } from './cachemanager/cachemanager.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './auth/guards/at.guards';

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    SuppliersModule,
    CategoriesModule,
    OrdersModule,
    TransactionsModule,
    WarehousesModule,
    InventoriesModule,
    ShippingModule,
    PricingsModule,
    ReturnsModule,
    DatabaseModule,
    
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    SeedModule,
    LogsModule,
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
          logger: true, // Enable logging for cache operations
        };
      },
    }),
    CachemanagerModule,
    AuthModule,
  ],
  controllers: [AppController, CacheMetricsController],
  providers: [
    {
      provide: 'APP_INTERCEPTOR',
      useClass: CacheInterceptor, // Global cache interceptor
    },
    // {
    //   provide: APP_GUARD,
    //   useClass: AtGuard, // Global access token guard
    // }
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
