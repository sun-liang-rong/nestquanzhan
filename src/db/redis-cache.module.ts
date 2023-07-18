import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisCacheService } from './redis-cache.service';
import {  Module, Global, CacheStore } from '@nestjs/common';
import { redisStore } from 'cache-manager-redis-store';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const REDIS_CONFIG = configService.get('REDIS_CONFIG');
        const  store = await redisStore({
            socket: {
              host: REDIS_CONFIG.REDIS_HOST,
              port: REDIS_CONFIG.REDIS_PORT,
            },
            database: REDIS_CONFIG.REDIS_DB,
            password: REDIS_CONFIG.REDIS_PASSWORD,
          });
          return {
            store: store as unknown as CacheStore,
          }
        }
      // },
    }),
  ],
  providers: [RedisCacheService],
  exports: [RedisCacheService],
})
export class RedisCacheModule {}
