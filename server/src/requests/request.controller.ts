/* eslint-disable */
import {Controller, Post, Body, UseGuards, Request, Get, Put, Delete} from '@nestjs/common';
import { RequestService } from './request.service';
import {AuthenticatedGuard} from "../auth/authenticated.guard";

@Controller('api/requests')
export class RequestController {
    constructor(private readonly requestService: RequestService) {}


    // Angebot erstellen
    @Post('/createRequest')
    async addRequest(
        @Body('zeit') zeit: Date,
        @Body('kosten') kosten: number,
        @Body('sitzplaetze') sitzplaetze: number,
        @Body('frachtplatz') frachtplatz: number,
        @Body('startort') startort: string,
        @Body('ziel') ziel: string,
        @Body('commentar') commentar: string,
        @Request() req
    ) {
        const bucher = '';
        const generatedId = await this.requestService.insertRequest(
            zeit,
            req.user.userEmail,
            kosten,
            sitzplaetze,
            frachtplatz,
            startort,
            ziel,
            bucher,
            commentar
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
    async getRequests(@Request() req) {
        return await this.requestService.getRequests(req.user.userEmail);
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

    @UseGuards(AuthenticatedGuard)
    @Put('/takeRequest')
    async takeRequest(
        @Body('_id') offerId: string,
        @Request() req
    ) {
        const userId = req.user.userEmail;
        const result = await this.requestService.takeRequest(
            offerId,
            userId,
        );

        return result;
    }

}
