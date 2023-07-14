import { Controller, Get, Header, Redirect, Param, HttpException } from '@nestjs/common';
import { AppService } from './app.service';
import { identity } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Header('Cache-Control', 'none')
  // @Redirect('https://sunsunblog.top', 301)
  getHello(@Param('id') id): string {
    throw new HttpException('已存在', 401);
  }
}
