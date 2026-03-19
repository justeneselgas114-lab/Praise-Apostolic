import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pastor } from '../entities/pastor.entity';
import { PastorsService } from './pastors.service';
import { PastorsController } from './pastors.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Pastor])],
  controllers: [PastorsController],
  providers: [PastorsService],
  exports: [PastorsService],
})
export class PastorsModule {}
