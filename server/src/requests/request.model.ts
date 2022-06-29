/* eslint-disable */
import * as mongoose from 'mongoose';

const uniqueValidator = require('../../node_modules/mongoose-unique-validator');

// Angebote
export const RequestSchema = new mongoose.Schema({
    zeit: {type: Date},
    sucher: {type: String},
    bucher: {type: String},
    kosten: {type: Number, required: true},
    sitzplaetze: {type: Number, },
    frachtplatz: {type: Number},
    startort: {type: String},
    ziel: {type: String},
    angenommen: {type: Boolean},
    commentar: {type: String}
});
RequestSchema.plugin(uniqueValidator);
export interface Request extends mongoose.Document {
    zeit: Date;
    sucher: string;
    bucher: string;
    kosten: number;
    sitzplaetze: number;
    frachtplatz: number;
    startort: string;
    ziel: string;
    angenommen: boolean;
    commentar: string;
}
