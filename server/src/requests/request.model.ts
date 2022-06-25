/* eslint-disable */
import * as mongoose from 'mongoose';

const uniqueValidator = require('../../node_modules/mongoose-unique-validator');

// Angebote
export const RequestSchema = new mongoose.Schema({
    email: {type: String},
    zeit: {type: Date},
    sucher: {type: String},
    kosten: {type: Number, required: true},
    sitzplaetze: {type: Number, },
    frachtplatz: {type: Number},
    startort: {type: String},
    ziel: {type: String}
});
RequestSchema.plugin(uniqueValidator);
export interface Request extends mongoose.Document {
    email: string;
    zeit: Date;
    sucher: string;
    kosten: number;
    sitzplaetze: number;
    frachtplatz: number;
    startort: string;
    ziel: string;
}