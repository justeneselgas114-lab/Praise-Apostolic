import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GalleryItem } from './entities/gallery-item.entity';
import { CreateGalleryItemDto } from './dto/create-gallery-item.dto';
import { UpdateGalleryItemDto } from './dto/update-gallery-item.dto';

@Injectable()
export class GalleryService {
  constructor(
    @InjectRepository(GalleryItem)
    private readonly galleryRepository: Repository<GalleryItem>,
  ) {}

  create(createGalleryItemDto: CreateGalleryItemDto) {
    const item = this.galleryRepository.create(createGalleryItemDto);
    return this.galleryRepository.save(item);
  }

  findAll() {
    return this.galleryRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: string) {
    const item = await this.galleryRepository.findOne({ where: { id } });
    if (!item) {
      throw new NotFoundException(`Gallery item with ID ${id} not found`);
    }
    return item;
  }

  async update(id: string, updateGalleryItemDto: UpdateGalleryItemDto) {
    await this.findOne(id);
    return this.galleryRepository.update(id, updateGalleryItemDto);
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.galleryRepository.delete(id);
  }
}
