/* eslint-disable */
import {Injectable, NotAcceptableException} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from './request.model';
import {User} from "../users/user.model";

@Injectable()
export class RequestService {
    constructor(@InjectModel('Request') public readonly requestModel: Model<Request>, @InjectModel('User') public readonly userModel: Model<User>  ) {}

    async insertRequest(
        zeit: Date,
        sucher: string,
        kosten: number,
        sitzplaetze: number,
        frachtplatz: number,
        startort: string,
        ziel: string,
        bucher: string,
        commentar: string
    ) {
        const newRequest = new this.requestModel({
            zeit: zeit,
            sucher: sucher,
            kosten: kosten,
            sitzplaetze: sitzplaetze,
            frachtplatz: frachtplatz,
            startort: startort,
            ziel: ziel,
            bucher: bucher,
            angenommen: false,
            commentar: commentar
        });
        const result = await newRequest.save();
        console.log(result);
        return result.id as Number;
    }

    async getRequest(requestId: Number) {
        const request = await this.requestModel.findOne({id: requestId});
        if (!request) {
            throw new NotAcceptableException('no matching request');
        }
        return request;
    }

    async deleteRequest(requestId: string) {
        const filter = {
            id: requestId
        };
        return await this.requestModel.findOneAndDelete(filter)
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

    async getRequests(userEmail: string) {
        const requests = await this.requestModel.find({ $and: [{ angenommen: { $eq: false } }, { sucher: { $ne: userEmail} }] }).exec();
        return requests as Request[];
    }

    async takeRequest(
        offerId,
        userId
    ) {
        const request = await this.getRequest(offerId);
        await this.userModel.findOneAndUpdate({email: request.sucher}, {$inc : {coins : -request.kosten}})
        await this.userModel.findOneAndUpdate({email: userId}, {$inc : {coins : +request.kosten}})
        this.requestModel.findOneAndUpdate({_id: offerId}, {bucher: userId, angenommen: true}, (err, res) => {
            if (err) {
                return (err)
            } else {
                return (res)
            }
        })
    }
}
