import { MiddlewareConsumer, Module, NestMiddleware, NestModule, } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { ConfigModule } from '@nestjs/config';
import { getConfig } from './utils';
import { LoggerMiddleware } from './LoggerMiddleware'
import * as winston from 'winston';
import { format } from 'winston';
import { WinstonModule } from 'nest-winston';
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module';
const { MYSQL_CONFIG } = getConfig();
console.log(MYSQL_CONFIG.password)
@Module({
  imports: [CatsModule, ConfigModule.forRoot({
    ignoreEnvFile: true,
    isGlobal: true,
    load: [getConfig],
  }),
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: MYSQL_CONFIG.host,
    port: MYSQL_CONFIG.port,
    username: MYSQL_CONFIG.username,
    password: MYSQL_CONFIG.password,
    database: MYSQL_CONFIG.database,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  }),
  AuthModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
