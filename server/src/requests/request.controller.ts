import {Controller, Post, Body, UseGuards, Request, Get, Put, Delete} from '@nestjs/common';
import { RequestService } from './request.service';

@Controller('api/requests')
export class RequestController {
    constructor(private readonly requestService: RequestService) {}


    // Angebot erstellen
    @Post('/createRequest')
    async addRequest(
        @Body('email') email: string,
        @Body('zeit') zeit: Date, // string?
        @Body('kosten') kosten: number,
        @Body('sitzplaetze') sitzplaetze: number,
        @Body('frachtplatz') frachtplatz: number,
        @Body('startort') startort: string,
        @Body('ziel') ziel: string,
    ) {
        const generatedId = await this.requestService.insertRequest(
            email,
            zeit,
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
        const email = req.email;
        const zeit = req.zeit;
        const  kosten = req.kosten;
        const  sitzplaetze = req.sitzplaetze;
        const  frachtplatz = req.frachtplatz;
        const  startort = req.startort;
        const  ziel = req.ziel;
        const id = req.id;
        await this.requestService.updateRequest(
            email,
            zeit,
            kosten,
            sitzplaetze,
            frachtplatz,
            startort,
            ziel
        );
        return;
    }

    // PUT: Angebot annehmen
    @Put('/takeOffer')
    async takeOffer(
        @Request() req
    ) {
        const email = req.email;
        const zeit = req.zeit;
        const bucher = req.bucher;
        const  kosten = req.kosten;


        const result = await this.requestService.takeOffer(
            email,
            zeit,
            bucher,
            kosten,

        );

        return result;
    }


}