/* eslint-disable */
import {Body, Controller, Delete, Get, Post, Put, Req, Request, Res, UseGuards} from '@nestjs/common';
import {UsersService} from './users.service';
import {LocalAuthGuard} from 'src/auth/local.auth.guard';
import * as bcrypt from 'bcrypt';
import {AuthenticatedGuard} from "../auth/authenticated.guard";

@Controller('api/users')
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
    const currentPassword = await (await this.usersService.getUser(emailID)).password;
    console.log(currentPassword)
    console.log(userPassword)
    if(currentPassword === userPassword) {
      await this.usersService.updateUser(
          userFirstname,
          userLastname,
          userPassword,
          userDescription,
          emailID
      );
    } else {
      await this.usersService.updateUser(
          userFirstname,
          userLastname,
          hashedPassword,
          userDescription,
          emailID
      );
    }
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
      @Request() req,
      @Res() res,
  ) {
    const emailID = req.user.userEmail;
    const generatedId = await this.usersService.insertVehicle(
        vehicleModel,
        vehicleSpace,
        vehicleSeats,
        emailID
    );
    const vehicles = await this.usersService.getVehicles(
        emailID
    );
    res.status(200).send({vehicles: vehicles})
  }
  @UseGuards(AuthenticatedGuard)
  @Get('/getVehicles')
  async getVehicle(
     @Request() req,
     @Res() res,
    ) {
    const emailID = req.user.userEmail;
    const vehicles = await this.usersService.getVehicles(
        emailID
    );
    res.status(200).send({vehicles: vehicles})
  }

  @UseGuards(AuthenticatedGuard)
  @Post('/deleteVehicle')
  async deleteVehicle(
      @Body('id') vehicleID: string,
      @Request() req,
      @Res() res,
  ) {
    const vehicle = await this.usersService.deleteVehicle(
        vehicleID
    );
    const emailID = req.user.userEmail;
    const vehicles = await this.usersService.getVehicles(
        emailID
    );
    res.status(200).send({vehicles: vehicles})
  }

  @UseGuards(AuthenticatedGuard)
  @Put('/addEval')
  async addEval(
      @Body('email') userEmail: string,
      @Body('evaluation') evaluation: number,
      @Request() req
  ) {
    const generatedId = await this.usersService.insertEvaluation(
        userEmail,
        evaluation,
        req.user.userEmail,
    );
    return { id: generatedId };
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/getCoins')
  async getCoins(
      @Request() req
  ) {
    const emailID = req.user.userEmail;
    const coins = await this.usersService.getCoins(
        emailID
    );
    return coins.coins;
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/getOwnEvaluations')
  async getOwnEvaluations(
      @Request() req
  ) {
    const emailID = req.user.userEmail;
    const user = await this.usersService.getEvaluations(
        emailID
    );
    return user.avStars;
  }

  //@UseGuards(AuthenticatedGuard)
  @Get('/getAll')
  async getAll(
      @Res() res
  )
   {
     const usersArray = await this.usersService.getAll();
     res.status(200).send({usersArray: usersArray})
  }

  //@UseGuards(AuthenticatedGuard)
  @Get('/getUser')
  async getUser(
      @Req() req,
      @Res() res,
  )
  {
    const user = await this.usersService.getUser(req.user.userEmail);
    res.status(200).send({user: user})
  }

}
