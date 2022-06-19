import * as mongoose from 'mongoose';

const uniqueValidator = require('../../node_modules/mongoose-unique-validator');

// Angebote
export const ListingSchema = new mongoose.Schema({
    id: {type: Number},
    kosten: {type: Number, required: true},
    sitzplaetze: {type: Number, required: true},
    frachtplatz: {type: Number},
    startort: {type: String},
    ziel: {type: String}
});
ListingSchema.plugin(uniqueValidator);
export interface Listing extends mongoose.Document {
    id: number;
    //_id: string;
    kosten: number;
    sitzplaetze: number;
    frachtplatz: number;
    startort: string;
    ziel: string;
}