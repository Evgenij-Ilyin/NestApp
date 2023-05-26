import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const { password: _, ...result } = user;
    return result;
  }

  async signUp(username: string, password: string): Promise<any> {
    const hashedPassword = await hash(password, 10);
    // Save the user with the hashed password to the database
    const user = await this.usersService.createUser(username, hashedPassword);
    return user;
  }

  async login(user: any): Promise<{ access_token: string }> {
    const payload = { username: user.username, sub: user.userId };
    const access_token = this.jwtService.sign(payload);
    return { access_token };
  }
}
