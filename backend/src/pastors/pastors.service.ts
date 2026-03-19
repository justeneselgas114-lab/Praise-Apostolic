import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pastor } from '../entities/pastor.entity';
import { CreatePastorDto } from './dto/create-pastor.dto';
import { UpdatePastorDto } from './dto/update-pastor.dto';

@Injectable()
export class PastorsService {
  constructor(
    @InjectRepository(Pastor)
    private readonly pastorsRepository: Repository<Pastor>,
  ) {}

  create(createPastorDto: CreatePastorDto) {
    const pastor = this.pastorsRepository.create(createPastorDto);
    return this.pastorsRepository.save(pastor);
  }

  findAll() {
    return this.pastorsRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: string) {
    const pastor = await this.pastorsRepository.findOne({ where: { id } });
    if (!pastor) {
      throw new NotFoundException(`Pastor with ID ${id} not found`);
    }
    return pastor;
  }

  async update(id: string, updatePastorDto: UpdatePastorDto) {
    await this.findOne(id);
    return this.pastorsRepository.update(id, updatePastorDto);
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.pastorsRepository.delete(id);
  }
}
