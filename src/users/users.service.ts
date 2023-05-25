import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { UsersRepository } from './usersRepository';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';




@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private UsersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.UsersRepository.create(createUserDto);
    return this.UsersRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.UsersRepository.find();
  }

  findOne(id: string): Promise<User | null> {
    return this.UsersRepository.findOneBy({ id });
  }

  update(id: string, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    return this.UsersRepository.update(id, updateUserDto);
  }

  async remove(id: string): Promise<void> {
    await this.UsersRepository.delete(id);
  }
}
