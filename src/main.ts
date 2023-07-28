import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './TransformInterceptor';
import { AllExceptionsFilter } from './AllExceptionsFilter'
import { ValidationPipe } from '@nestjs/common';
//用 nest new 创建一个 main 服务，一个微服务
// 都要安装 @nestjs/microservices 包，因为用到其中的 api
// 微服务里用 createMicroservice 启动服务，选择传输方式为 TCP，指定端口
// 微服务里在 Controller 使用 MessagePattern 或者 EventPattern 注册处理消息的 handler
// main 服务使用 ClientsModule.register 来注册微服务
// main 服务里注入 ClientProxy 对象，调用它的 send 方法给微服务发消息

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(3000);
}
bootstrap();
