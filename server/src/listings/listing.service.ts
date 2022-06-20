import {Injectable, NotAcceptableException, UnauthorizedException} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Listing } from './listing.model';
// todo import
//import { userModel } from './users/user.model'

@Injectable()
export class ListingService {
    constructor(@InjectModel('Listing') public readonly listingModel: Model<Listing> ) {}

    async insertListing(
        email: string,
        zeit: Date,

        kosten: number,
        sitzplaetze: number,
        frachtplatz: number,
        startort: string,
        ziel: string,
    ) {
        const newListing = new this.listingModel({
            email: email,
            zeit: zeit,

            kosten: kosten,
            sitzplaetze: sitzplaetze,
            frachtplatz: frachtplatz,
            startort: startort,
            ziel: ziel
        });
        //console.log("hi");
        const result = await newListing.save();
        //console.log("hi");
        console.log(result);

        return result.id as Number;
    }

    async getListing(listingId: Number) {
        const id = listingId;
        const listing = await this.listingModel.findOne({id});
        if (!listing) {
            throw new NotAcceptableException('no matching listing');
        }
        return listing;
    }

    async getListings() {
        const filter = {};
        const listings = await this.listingModel.find(filter).exec();

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
        email: string,
        zeit: Date,
        //id: number,
        kosten: number,
        sitzplaetze: number,
        frachtplatz: number,
        startort: string,
        ziel: string,
    ) {
        const conditions = {
            email: email,
            zeit: zeit
        }
        const updetedListing = {
            kosten,
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

    // todo
    async giveOffer(
        email: string, // anbieter
        zeit: Date,
        bucher: string,
        kosten: number,
        sitzplaetze: number,
        frachtplatz: number,
        startort: string,
        ziel: string,
    ) {

        const newListing = new this.listingModel({
            email: email,
            zeit: zeit,
            bucher: bucher,
            kosten: kosten,
            sitzplaetze: sitzplaetze,
            frachtplatz: frachtplatz,
            startort: startort,
            ziel: ziel,
        });

        const result = await newListing.save();
        console.log(result);
        return result ;

    }

    // geht in request service
    // Angebot annehmen
    async takeOffer(
        email: string, // der anbieter
        zeit: Date,
        bucher: string,
        kosten: number, // coins

    ) {

        const conditions = {
            email: email,
            zeit: Date
        }

        // todo hinzufügen nach dem merge
        // this.userModel.findOneAndUpdate({email: email}, {$inc : {coins : kosten}})
        // this.userModel.findOneAndUpdate({email: bucher}, {$inc : {coins : -kosten}})

        this.listingModel.findOneAndUpdate(conditions, {bucher: bucher}, (err, res) => {
            if (err) {
                console.log("Listing update failed")
                return (err)
            } else {
                return (res)
            }
        })
    }
}