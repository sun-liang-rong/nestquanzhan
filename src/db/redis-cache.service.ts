import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisCacheService {
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}
  cacheSet(key: string, value: string, ttl: number) {
    this.cacheManager.set(key, value, ttl);
  }
  async cacheGet(key: string): Promise<any> {
    return await this.cacheManager.get(key);
  }
  async cacheDel(key: string): Promise<any> {
    return await this.cacheManager.del(key);
  }
  async cacheReset(): Promise<any> {
    return await this.cacheManager.reset();
  }
}