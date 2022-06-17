import {Injectable, NotAcceptableException, UnauthorizedException} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Listing } from './listing.model';

@Injectable()
export class ListingService {
    constructor(@InjectModel('Listing') public readonly listingModel: Model<Listing> ) {}

    async insertListing(
        kosten: number,
        sitzplaetze: number,
        frachtplatz: number,
        startort: string,
        ziel: string,
    ) {
        const newListing = new this.listingModel({
            kosten: kosten,
            sitzplaetze: sitzplaetze,
            frachtplatz: frachtplatz,
            startort: startort,
            ziel: ziel
        });
        const result = await newListing.save();
        console.log(result);
        return result.id as string;
    }

    async getListing(idListing: Number) {
        const id = idListing;
        const listing = await this.listingModel.findOne({id});
        if (!listing) {
            throw new NotAcceptableException('no matching listing');
        }
        return listing;
    }

    async deleteListing(listingId: string) {
        const conditions = {
            _id: listingId
        }
        const listing = await this.listingModel.findOneAndDelete(conditions);
        console.log("This listing was deleted:" + listing);
        return listing;
    }

    async updateListing(
        kosten: number,
        sitzplaetze: number,
        frachtplatz: number,
        startort: string,
        ziel: string,
    ) {
        // todo
    }
}