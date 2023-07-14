import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, } from 'express';
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: any) {
    const start = Date.now();
    await next();
    const responseTime = Date.now() - start;
  }
}
