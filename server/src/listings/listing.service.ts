/* eslint-disable */
import {Injectable, NotAcceptableException, UnauthorizedException} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Listing } from './listing.model';

import { User } from '../users/user.model';

@Injectable()
export class ListingService {
    constructor(@InjectModel('Listing') public readonly listingModel: Model<Listing>, @InjectModel('User') public readonly userModel: Model<User> ) {}

    async insertListing(

        zeit: Date,
        bucher: string,
        kosten: number,
        sitzplaetze: number,
        frachtplatz: number,
        startort: string,
        ziel: string,
        ersteller: string

    ) {
        const newListing = new this.listingModel({

            zeit: zeit,
            bucher: bucher,
            ersteller: ersteller,
            kosten: kosten,
            sitzplaetze: sitzplaetze,
            frachtplatz: frachtplatz,
            startort: startort,
            ziel: ziel,
            angenommen: false,
        });
        const result = await newListing.save();
        console.log(result);

        return result.id as Number;
    }

    async getListing(listingId: string) : Promise<Listing> {
        const listing = await this.listingModel.findById(listingId);
        if (!listing) {
            throw new NotAcceptableException('no matching listing');
        }
        return listing;
    }

    async getListings(user: any) {

        const listings = await this.listingModel.find({ $and: [{ angenommen: { $eq: false } }, { ersteller: { $ne: user.userId} }] }).exec();

        return listings as Listing[];
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
        zeit: Date,
        kosten: number,
        sitzplaetze: number,
        frachtplatz: number,
        startort: string,
        ziel: string,
        _id: string
    ) {
        const conditions = {
            _id: _id
        }
        const updetedListing = {
            kosten,
            zeit,
            sitzplaetze,
            frachtplatz,
            startort,
            ziel
        }
        this.listingModel.findByIdAndUpdate(conditions,updetedListing,(err,res) =>{
            if (err) {
                console.log("Listing update failed")
                return (err)
            } else {
                return (res)
            }
        })
    }


    async takeOffer(
        offerId,
        userId
    ) {
        const angebot = await this.getListing(offerId);
        await this.userModel.findOneAndUpdate({email: angebot.ersteller}, {$inc : {coins : angebot.kosten}})
        await this.userModel.findOneAndUpdate({email: userId}, {$inc : {coins : -angebot.kosten}})
        this.listingModel.findOneAndUpdate({_id: offerId}, {bucher: userId, angenommen: true}, (err, res) => {
            if (err) {
                return (err)
            } else {
                return (res)
            }
        })
    }
}
