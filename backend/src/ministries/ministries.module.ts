import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ministry } from '../entities/ministry.entity';
import { MinistriesService } from './ministries.service';
import { MinistriesController } from './ministries.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Ministry])],
  controllers: [MinistriesController],
  providers: [MinistriesService],
  exports: [MinistriesService],
})
export class MinistriesModule {}
