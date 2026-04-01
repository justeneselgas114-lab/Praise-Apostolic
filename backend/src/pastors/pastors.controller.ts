import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PastorsService } from './pastors.service';
import { CreatePastorDto } from './dto/create-pastor.dto';
import { UpdatePastorDto } from './dto/update-pastor.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('pastors')
export class PastorsController {
  constructor(private readonly pastorsService: PastorsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createPastorDto: CreatePastorDto) {
    return this.pastorsService.create(createPastorDto);
  }

  @Get()
  findAll() {
    return this.pastorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pastorsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePastorDto: UpdatePastorDto) {
    return this.pastorsService.update(id, updatePastorDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pastorsService.remove(id);
  }
}
