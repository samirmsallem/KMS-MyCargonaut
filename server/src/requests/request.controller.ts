import {Controller, Post, Body, UseGuards, Request, Get, Put, Delete} from '@nestjs/common';
import { RequestService } from './request.service';

@Controller('api/requests')
export class RequestController {
    constructor(private readonly requestService: RequestService) {}


    // Angebot erstellen
    @Post('/createRequest')
    async addRequest(
        @Body('kosten') kosten: number,
        @Body('sitzplaetze') sitzplaetze: number,
        @Body('frachtplatz') frachtplatz: number,
        @Body('startort') startort: string,
        @Body('ziel') ziel: string,
    ) {
        const generatedId = await this.requestService.insertRequest(
            kosten,
            sitzplaetze,
            frachtplatz,
            startort,
            ziel,
        );
        return {id: generatedId}
    }


    // get spezifisches Angebot
    @Get('/getRequest')
    async getRequest(
        @Request() req
    ) {
        const requestId = req.id;
        await this.requestService.getRequest(requestId);
        return;
    }



    // löschen spezifisches Angebot
    @Delete('/deleteRequest')
    async deleteRequest(
        @Request() req
    ) {
        const requestID = req.id
        await this.requestService.deleteRequest(
            requestID
        );
        return;
    }

    @Get('/getAllRequests')
    async getRequests() {
        const requests = await this.requestService.getRequests();
        return requests
    }


    // ändern spezifisches Angebot
    @Put('/updateRequest')
    async updateRequest(

        @Request() req
    ) {
        const  kosten = req.kosten;
        const  sitzplaetze = req.sitzplaetze;
        const  frachtplatz = req.frachtplatz;
        const  startort = req.startort;
        const  ziel = req.ziel;
        const id = req.id;
        await this.requestService.updateRequest(
            id,
            kosten,
            sitzplaetze,
            frachtplatz,
            startort,
            ziel
        );
        return;
    }


}