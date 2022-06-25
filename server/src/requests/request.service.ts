/* eslint-disable */
import {Injectable, NotAcceptableException, UnauthorizedException} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from './request.model';
import {Listing} from "../listings/listing.model";

@Injectable()
export class RequestService {
    constructor(@InjectModel('Request') public readonly requestModel: Model<Request> ) {}

    async insertRequest(
        email: string,
        zeit: Date,
        sucher: string,
        kosten: number,
        sitzplaetze: number,
        frachtplatz: number,
        startort: string,
        ziel: string,
    ) {
        const newRequest = new this.requestModel({
            email: email,
            zeit: zeit,
            sucher: sucher,
            kosten: kosten,
            sitzplaetze: sitzplaetze,
            frachtplatz: frachtplatz,
            startort: startort,
            ziel: ziel
        });
        const result = await newRequest.save();
        console.log(result);
        return result.id as Number;
    }

    async getRequest(requestId: Number) {
        const id = requestId;
        const request = await this.requestModel.findOne({id});
        if (!request) {
            throw new NotAcceptableException('no matching request');
        }
        return request;
    }

    async deleteRequest(requestId: string) {
        const filter = {
            id: requestId
        };
        const request = await this.requestModel.findOneAndDelete(filter)

        return request;
    }

    async updateRequest(
        email: string,
        zeit: Date,
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
        const updetedRequest = {
            kosten,
            sitzplaetze,
            frachtplatz,
            startort,
            ziel
        }
        this.requestModel.findByIdAndUpdate(conditions,updetedRequest,(err,res) =>{
            if (err) {
                console.log("Request update failed")
                return (err)
            } else {
                return (res)
            }
        })
    }

    async getRequests() {
        const filter = {};
        const requests = await this.requestModel.find(filter).exec();

        return requests as Request[];
    }

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

        this.requestModel.findOneAndUpdate(conditions, {bucher: bucher}, (err, res) => {
            if (err) {
                console.log("Request update failed")
                return (err)
            } else {
                return (res)
            }
        })
    }
}