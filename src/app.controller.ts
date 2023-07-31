import { Controller, Get, Header, Redirect, Param, HttpException, Inject, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { identity } from 'rxjs';
import { Observable } from 'rxjs';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
@Controller()
export class AppController {
  //然后就可以用了，在 Controller 里注入这个微服务的 clientProxy，也就是客户端代理。
  constructor(private readonly appService: AppService, 
    @Inject('MATH_SERVICE')  private readonly client: ClientProxy
    ) {}

  @Get()
  // @Header('Cache-Control', 'none')
  // @Redirect('https://sunsunblog.top', 301)
  getHello(@Query('arr') str): Observable<number> {
    console.log('arr', str)
    const numArr = str.split(',').map((item) => parseInt(item));
    return this.client.send<number>('sum', numArr);
    // throw new HttpException('已存在', 401);

  }
}
