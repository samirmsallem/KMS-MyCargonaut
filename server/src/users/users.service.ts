import { Injectable, NotAcceptableException } from '@nestjs/common';
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
  ) {
    const newUser = new this.userModel({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
      description: description,
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
}
