import { IsString, IsNumber, IsEmail, IsNotEmpty } from 'class-validator';
import { Role } from 'src/roles/entities/role.entity';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsNumber()
    @IsNotEmpty()
    roleId: number;
}
