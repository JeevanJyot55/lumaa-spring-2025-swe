import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('register')
  async register(@Body() body: { username: string; password: string }): Promise<any> {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    return this.usersService.createUser(body.username, hashedPassword);
  }

  @Post('login')
  async login(@Body() body: { username: string; password: string }): Promise<any> {
    const user = await this.authService.validateUser(body.username, body.password);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    return this.authService.login(user);
  }
}