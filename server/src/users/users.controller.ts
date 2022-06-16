import {Controller, Post, Body, UseGuards, Request, Get} from '@nestjs/common';
import { UsersService } from './users.service';
import { LocalAuthGuard } from 'src/auth/local.auth.guard';
import * as bcrypt from 'bcrypt';
import {AuthenticatedGuard} from "../auth/authenticated.guard";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @Post('/createUser')
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
    return {id: generatedId};
  }

  @UseGuards(LocalAuthGuard)
  @Post('/loginUser')
  login(@Request() req): any {
    return {
      User: req.user,
      msg: 'User logged in successfully'
    };
  }
  @Get('/logoutUser')
  logout(@Request() req): any {
    req.session.destroy();
    return {
      User: req.user,
      msg: 'User logged out successfully'
    }
  }
  @UseGuards(AuthenticatedGuard)
  @Get('/protectedRoute')
  getProtection(@Request() req): string {
    return req.user;
  }
}
