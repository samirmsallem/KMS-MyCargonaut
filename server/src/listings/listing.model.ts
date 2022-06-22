import * as mongoose from 'mongoose';

const uniqueValidator = require('../../node_modules/mongoose-unique-validator');

// Angebote
export const ListingSchema = new mongoose.Schema({
    email: {type: String},
    zeit: {type: Date},
    kosten: {type: Number},
    sitzplaetze: {type: Number},
    frachtplatz: {type: Number},
    startort: {type: String},
    ziel: {type: String}
});
ListingSchema.plugin(uniqueValidator);

export interface Listing extends mongoose.Document {
    email: string;
    zeit: Date;
    bucher: string;
    kosten: number;
    sitzplaetze: number;
    frachtplatz: number;
    startort: string;
    ziel: string;

}