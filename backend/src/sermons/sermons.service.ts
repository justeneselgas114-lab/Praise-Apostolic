import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sermon } from '../entities/sermon.entity';
import { CreateSermonDto } from './dto/create-sermon.dto';
import { UpdateSermonDto } from './dto/update-sermon.dto';

@Injectable()
export class SermonsService {
  constructor(
    @InjectRepository(Sermon)
    private readonly sermonsRepository: Repository<Sermon>,
  ) {}

  create(createSermonDto: CreateSermonDto) {
    const sermon = this.sermonsRepository.create(createSermonDto);
    return this.sermonsRepository.save(sermon);
  }

  findAll() {
    return this.sermonsRepository.find({ order: { date: 'DESC' } });
  }

  async findOne(id: string) {
    const sermon = await this.sermonsRepository.findOne({ where: { id } });
    if (!sermon) {
      throw new NotFoundException(`Sermon with ID ${id} not found`);
    }
    return sermon;
  }

  async update(id: string, updateSermonDto: UpdateSermonDto) {
    await this.findOne(id);
    return this.sermonsRepository.update(id, updateSermonDto);
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.sermonsRepository.delete(id);
  }
}
