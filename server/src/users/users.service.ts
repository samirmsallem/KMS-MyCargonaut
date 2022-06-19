/* eslint-disable */
import {Injectable, NotAcceptableException, UnauthorizedException} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.model';
import { Vehicle } from "./vehicles.model";


@Injectable()
export class UsersService {
  constructor(@InjectModel('User') public readonly userModel: Model<User>,@InjectModel('Vehicle') public readonly vehicleModel: Model<Vehicle> ) {}

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
      coins: coins,
      stars: [],
      avStars: 0,
      evaluations: []
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
  async insertVehicle(
      model: string,
      space: number,
      seats: number,
      emailID: string,
  ) {
    const newVehicle = new this.vehicleModel({
      model: model,
      space: space,
      seats: seats,
      email: emailID
    });
    const result = await newVehicle.save();
    console.log(result);
    return result.id as string;
  }
  async getVehicles(
      emailID: string,
  ) {
    const conditions = {
      email: emailID
    }
    const vehicles = await this.vehicleModel.find(conditions);
    console.log("Hier die Vehicles:" + vehicles)
    return vehicles;
  }
  async deleteVehicle(
      vehicleID: string
  ) {
    const conditions = {
      _id: vehicleID
    }
    const vehicle = await this.vehicleModel.findOneAndDelete(conditions);
    console.log("This vehicle was deleted:" + vehicle);
    return vehicle;
  }

  async insertEvaluation(
      email: string,
      evaluation: number,
      evaluator: string,
  ) {
    const conditions = {
      email: email,
    };
    const currentTarget = await this.userModel.findOne(conditions);
    if(currentTarget.evaluations.length === 0) {
      await this.userModel.findOneAndUpdate(conditions, {stars: [evaluation], evaluations: [evaluator], avStars: evaluation})
    } else {
      for(let i = 0; i < currentTarget.evaluations.length; i++) {
        if(currentTarget.evaluations[i] === evaluator) {
          let starsArr: Number[] = currentTarget.stars;
          starsArr[i] = evaluation;
          let newAvStars: number = 0;
          for(let i = 0; i < currentTarget.stars.length; i++) {
            newAvStars = newAvStars + currentTarget.stars[i];
          }
          newAvStars = ((newAvStars) / (currentTarget.stars.length))
          return this.userModel.findOneAndUpdate(conditions, {stars: starsArr, avStars: newAvStars});
        }
      }
      let starsArr: Number[] = currentTarget.stars;
      starsArr.push(evaluation);
      let evaluatorArr: String[] = currentTarget.evaluations;
      evaluatorArr.push(evaluator);
      let newAvStars: number = 0;
      for(let i = 0; i < currentTarget.stars.length; i++) {
        newAvStars = newAvStars + currentTarget.stars[i];
      }
      newAvStars = ((newAvStars) / (currentTarget.stars.length))
      await this.userModel.findOneAndUpdate(conditions, {stars: starsArr, evaluations: evaluatorArr, avStars: newAvStars})
    }
  }
}
