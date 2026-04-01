import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MinistriesService } from './ministries.service';
import { CreateMinistryDto } from './dto/create-ministry.dto';
import { UpdateMinistryDto } from './dto/update-ministry.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('ministries')
export class MinistriesController {
  constructor(private readonly ministriesService: MinistriesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createMinistryDto: CreateMinistryDto) {
    return this.ministriesService.create(createMinistryDto);
  }

  @Get()
  findAll() {
    return this.ministriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ministriesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMinistryDto: UpdateMinistryDto) {
    return this.ministriesService.update(id, updateMinistryDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ministriesService.remove(id);
  }
}
