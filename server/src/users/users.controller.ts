import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async addUser(
    @Body('firstname') userFirstname: string,
    @Body('lastname') userLastname: string,
    @Body('email') userEmail: string,
    @Body('password') userPassword: string,
    @Body('description') userDescription: string,
  ) {
    const saltorRounds = 10;
    const hashedPassword = await bcrypt.hash(userPassword, saltorRounds);
    const generatedId = await this.usersService.insertUser(
      userFirstname,
      userLastname,
      userEmail,
      hashedPassword,
      userDescription,
    );
    return { id: generatedId };
  }
}
