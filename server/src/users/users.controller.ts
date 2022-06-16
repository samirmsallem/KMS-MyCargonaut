import {Controller, Post, Body, UseGuards, Request, Get, Put} from '@nestjs/common';
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
    const coins = 0;
    const generatedId = await this.usersService.insertUser(
        userFirstname,
        userLastname,
        userEmail,
        hashedPassword,
        userDescription,
        coins
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
  @UseGuards(AuthenticatedGuard)
  @Put('/updateUser')
  async updateUser(
      @Body('firstname') userFirstname: string,
      @Body('lastname') userLastname: string,
      @Body('password') userPassword: string,
      @Body('description') userDescription: string,
      @Request() req
  ) {
    const emailID = req.user.userEmail;
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(userPassword, saltOrRounds);
    await this.usersService.updateUser(
        userFirstname,
        userLastname,
        hashedPassword,
        userDescription,
        emailID
    );
    return;
  }
  @UseGuards(AuthenticatedGuard)
  @Put('/loadCoins')
  async loadCoins(
      @Body('coins') coins: number,
      @Request() req
  ) {
    const emailID = req.user.userEmail;
    const coinStatus = await this.usersService.loadCoins(
        emailID,
        coins
    );
    return coinStatus;
  }
  @UseGuards(AuthenticatedGuard)
  @Post('/addVehicle')
  async addVehicle(
      @Body('model') vehicleModel: string,
      @Body('space') vehicleSpace: number,
      @Body('seats') vehicleSeats: number,
      @Request() req
  ) {
    const emailID = req.user.userEmail;
    const generatedId = await this.usersService.insertVehicle(
        vehicleModel,
        vehicleSpace,
        vehicleSeats,
        emailID
    );
    return {id: generatedId};
  }
}
