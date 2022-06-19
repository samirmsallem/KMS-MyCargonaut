import {Injectable, NotAcceptableException, UnauthorizedException} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from './request.model';

@Injectable()
export class RequestService {
    constructor(@InjectModel('Request') public readonly requestModel: Model<Request> ) {}

    async insertRequest(
        kosten: number,
        sitzplaetze: number,
        frachtplatz: number,
        startort: string,
        ziel: string,
    ) {
        const newRequest = new this.requestModel({
            kosten: kosten,
            sitzplaetze: sitzplaetze,
            frachtplatz: frachtplatz,
            startort: startort,
            ziel: ziel
        });
        const result = await newRequest.save();
        console.log(result);
        return result.id as string;
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
        const conditions = {
            _id: requestId
        }
        const request = await this.requestModel.findOneAndDelete(conditions);
        console.log("This request was deleted:" + request);
        return request;
    }

    async updateRequest(
        id: number,
        kosten: number,
        sitzplaetze: number,
        frachtplatz: number,
        startort: string,
        ziel: string,
    ) {
        const conditions = {
            id: id
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
        const requests = await this.requestModel.find().exec();
        return requests as Request[];
    }
}