import {Injectable, NotAcceptableException, UnauthorizedException} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') public readonly userModel: Model<User>) {}

  async insertUser(
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    description: string,
    coins: number
  ) {
    const newUser = new this.userModel({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
      description: description,
      coins: coins
    });
    const result = await newUser.save();
    console.log(result);
    return result.id as string;
  }

  async getUser(userEmail: string) {
    const email = userEmail;
    const user = await this.userModel.findOne({email});
    if (!user) {
      throw new NotAcceptableException('no matching email found');
    }
    return user;
  }
  async updateUser(
      firstname: string,
      lastname: string,
      email: string,
      password: string,
      description: string,
      emailID: string
  ) {
    const conditions = {
      email: emailID
    }
    const updatedUser = {
      firstname,
      lastname,
      email,
      password,
      description
    }
    this.userModel.findOneAndUpdate(conditions, updatedUser, (err, res) => {
      if (err) {
        console.log("User update failed")
        return (err)
      } else {
        return (res)
      }
    })
  }
  async loadCoins(
      emailID: string,
      coins: number
  ) {
    const conditions = {
      email: emailID
    }
    const updateCoins = {
      coins
    }
    this.userModel.findOneAndUpdate(conditions,updateCoins, (err, res) => {
      if(err) {
        console.log(err)
        return(err)
      } else {
        return(res)
      }
    })
  }
}
