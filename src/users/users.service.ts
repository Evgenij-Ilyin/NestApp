import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hash } from 'bcrypt';
import { RolesService } from 'src/roles/roles.service';
import { RolesRepository } from 'src/roles/rolesRepository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private UsersRepository: Repository<User>,
    private RolesService: RolesService,
  ) {}

  async create(createUserDto: CreateUserDto, roleId: number): Promise<User> {
    createUserDto.password = await hash(createUserDto.password, 10);
    const user = this.UsersRepository.create(createUserDto);
    user.role = await this.RolesService.findOne(roleId);
    return this.UsersRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.UsersRepository.find();
  }

  findOne(username: string): Promise<User | null> {
    return this.UsersRepository.findOneBy({ username });
  }

  update(id: string, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    return this.UsersRepository.update(id, updateUserDto);
  }

  async remove(id: string): Promise<void> {
    await this.UsersRepository.delete(id);
  }
}
