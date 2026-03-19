import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return await this.usersRepository.save(user);
  }

  async findAll() {
    const users = await this.usersRepository.find({
      order: { createdAt: 'DESC' },
    });
    return users.map((u) => {
      const { password, ...safe } = u as any;
      return safe;
    });
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    const { password, ...safe } = user as any;
    return safe;
  }

  async findByEmail(email: string) {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async ensureAdminUser(email: string, password: string) {
    const existing = await this.findByEmail(email);
    if (existing) return existing;

    const createUserDto = {
      firstName: 'Admin',
      lastName: 'User',
      email,
      password,
      isActive: true,
    };

    return this.create(createUserDto as any);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    // Ensure the user exists before attempting an update
    await this.findOne(id);

    // If password is being updated, hash it before storing
    if (updateUserDto.password) {
      updateUserDto = {
        ...updateUserDto,
        password: await bcrypt.hash(updateUserDto.password, 10),
      };
    }

    await this.usersRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.usersRepository.delete(id);
  }
}