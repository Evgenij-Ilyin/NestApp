import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { RolesRepository } from './rolesRepository';


@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private RolesRepository: Repository<Role>,
  ) {}

  async create(name: string): Promise<Role> {
    const role = new Role();
    role.name = name;
    return this.RolesRepository.save(role);
  }

  async findOne(roleId: number): Promise<Role> {
    return this.RolesRepository.findOne({ where: { id: roleId } });
  }

  findAll(): Promise<Role[]> {
    return this.RolesRepository.find();
  }
}
