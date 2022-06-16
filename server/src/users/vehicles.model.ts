import * as mongoose from 'mongoose';

export const VehicleSchema = new mongoose.Schema({
    model: { type: String, required: true },
    space: { type: Number, required: true },
    seats: {type: Number, required: true},
    email: {type: String, required: true}
});


export interface Vehicle extends mongoose.Document {
    _id: string;
    model: string;
    space: number;
    seats: number;
    email: string
}
