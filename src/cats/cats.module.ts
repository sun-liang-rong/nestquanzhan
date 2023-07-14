import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { Cat } from './entities/cat.entity';
import { CatInfo } from '../entities/info.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Cat, CatInfo])],
  controllers: [CatsController],
  providers: [CatsService]
})
export class CatsModule {}
