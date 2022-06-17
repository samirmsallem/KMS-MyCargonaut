import * as mongoose from 'mongoose';

export const ListingSchema = new mongoose.Schema({
    kosten: {type: Number, required: true},
    sitzplaetze: {type: Number, required: true},
    frachtplatz: {type: Number},
    startort: {type: String},
    ziel: {type: String}
});

export interface Listing extends mongoose.Document {
    _id: string;
    kosten: number;
    sitzplaetze: number;
    frachtplatz: number;
    startort: string;
    ziel: string;
}