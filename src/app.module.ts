import { MiddlewareConsumer, Module, NestMiddleware, NestModule, } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { ConfigModule } from '@nestjs/config';
import { getConfig } from './utils';
import { LoggerMiddleware } from './LoggerMiddleware'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module';
import { RedisCacheModule } from './db/redis-cache.module'
// import { ClientsModule, Transport } from '@nestjs/microservices'
const { MYSQL_CONFIG } = getConfig();
console.log(MYSQL_CONFIG.password)
//微服务需要在主服务的appmodule里面注册
@Module({
  imports: [CatsModule,
  //调用 ClientModule.register 指定名字、传输方式为 TCP、端口为 3001
  // ClientsModule.register([
  //   {
  //     name: 'MATH_SERVICE',
  //     transport: Transport.TCP,
  //     options: {
  //       port: 3001,
  //     }
  //   }
  // ]),
  ConfigModule.forRoot({
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
  RedisCacheModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
