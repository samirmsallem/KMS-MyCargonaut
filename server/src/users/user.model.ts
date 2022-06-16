import * as mongoose from 'mongoose';

const uniqueValidator = require('../../node_modules/mongoose-unique-validator');

export const UserSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
    uniqueCaseInsensitive: true,
  },
  password: { type: String, required: true },
  description: { type: String, required: true },
  coins: {type: Number, required: true}
});
UserSchema.plugin(uniqueValidator);

export interface User extends mongoose.Document {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  description: string;
  coins: number;
}
