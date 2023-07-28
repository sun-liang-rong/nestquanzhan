import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './TransformInterceptor';
import { AllExceptionsFilter } from './AllExceptionsFilter'
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  const configService = app.get(ConfigService);   // 获取全局配置
  const PORT = configService.get<number>('PORT', 9000);
  const HOST = configService.get('HOST', 'localhost');
  await app.listen(PORT, () => {
    Logger.log(`服务已经启动,接口请访问:http://wwww.${HOST}:${PORT}`);
  });
  await app.listen(3000);
}
bootstrap();
