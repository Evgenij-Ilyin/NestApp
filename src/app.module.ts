import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { Role } from './roles/entities/role.entity';
import { RolesService } from './roles/roles.service';

@Module({
  imports: [UsersModule,
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '3880029',
    database: 'NestApp',
    entities: [User, Role],
    synchronize: true,
    autoLoadEntities: true,
    }),
  AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, RolesService],
})
export class AppModule {}
