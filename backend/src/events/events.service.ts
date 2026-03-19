import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChurchEvent } from '../entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(ChurchEvent)
    private readonly eventsRepository: Repository<ChurchEvent>,
  ) {}

  create(createEventDto: CreateEventDto) {
    const event = this.eventsRepository.create(createEventDto);
    return this.eventsRepository.save(event);
  }

  findAll() {
    return this.eventsRepository.find({ order: { date: 'DESC' } });
  }

  async findOne(id: string) {
    const event = await this.eventsRepository.findOne({ where: { id } });
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    return event;
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    await this.findOne(id);
    return this.eventsRepository.update(id, updateEventDto);
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.eventsRepository.delete(id);
  }
}
