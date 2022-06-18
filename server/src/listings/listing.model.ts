import * as mongoose from 'mongoose';

// Angebote
export const ListingSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    kosten: {type: Number, required: true},
    sitzplaetze: {type: Number, required: true},
    frachtplatz: {type: Number},
    startort: {type: String},
    ziel: {type: String}
});

export interface Listing extends mongoose.Document {
    id: string;
    //_id: string;
    kosten: number;
    sitzplaetze: number;
    frachtplatz: number;
    startort: string;
    ziel: string;
}