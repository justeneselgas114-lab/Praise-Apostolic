import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ministry } from '../entities/ministry.entity';
import { CreateMinistryDto } from './dto/create-ministry.dto';
import { UpdateMinistryDto } from './dto/update-ministry.dto';

@Injectable()
export class MinistriesService {
  constructor(
    @InjectRepository(Ministry)
    private readonly ministriesRepository: Repository<Ministry>,
  ) {}

  create(createMinistryDto: CreateMinistryDto) {
    const ministry = this.ministriesRepository.create(createMinistryDto);
    return this.ministriesRepository.save(ministry);
  }

  findAll() {
    return this.ministriesRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: string) {
    const ministry = await this.ministriesRepository.findOne({ where: { id } });
    if (!ministry) {
      throw new NotFoundException(`Ministry with ID ${id} not found`);
    }
    return ministry;
  }

  async update(id: string, updateMinistryDto: UpdateMinistryDto) {
    await this.findOne(id);
    return this.ministriesRepository.update(id, updateMinistryDto);
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.ministriesRepository.delete(id);
  }
}
