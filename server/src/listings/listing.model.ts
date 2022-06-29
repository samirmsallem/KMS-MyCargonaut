/* eslint-disable */
import * as mongoose from 'mongoose';

const uniqueValidator = require('../../node_modules/mongoose-unique-validator');

// Angebote
export const ListingSchema = new mongoose.Schema({

    zeit: {type: Date},
    bucher: {type: String},
    kosten: {type: Number},
    sitzplaetze: {type: Number},
    frachtplatz: {type: Number},
    startort: {type: String},
    ziel: {type: String},
    angenommen: {type: Boolean},
    ersteller: {type: String},
    commentar: {type: String},
});
ListingSchema.plugin(uniqueValidator);

export interface Listing extends mongoose.Document {

    _id: string;
    zeit: Date;
    bucher: string;
    kosten: number;
    sitzplaetze: number;
    frachtplatz: number;
    startort: string;
    ziel: string;
    angenommen: boolean;
    ersteller: string;
    commentar: string;
}
