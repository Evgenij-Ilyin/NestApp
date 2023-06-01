import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesService } from 'src/roles/roles.service';
import { RolesRepository } from 'src/roles/rolesRepository';
import { Role } from 'src/roles/entities/role.entity';


@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  exports: [TypeOrmModule, UsersService],
  controllers: [UsersController],
  providers: [UsersService, RolesService, RolesRepository],
})
export class UsersModule {}
  