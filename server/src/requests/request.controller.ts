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
        const requestId = req.request.id;
        await this.requestService.getRequest(requestId);
        return;
    }


    // löschen spezifisches Angebot
    @Delete('/deleteRequest')
    async deleteRequest(
        @Body('id') requestID: string,
    ) {
        await this.requestService.deleteRequest(
            requestID
        );
        return;
    }


    // ändern spezifisches Angebot
    @Put('/updateRequest')
    async updateRequest(
        @Body('kosten') kosten: number,
        @Body('sitzplaetze') sitzplaetze: number,
        @Body('frachtplatz') frachtplatz: number,
        @Body('startort') startort: string,
        @Body('ziel') ziel: string,
        @Request() req
    ) {
        const id = req.request.id;
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

    //todo GET: Alle Gesuche
    // POST: Angebot annehmen
    // POST: Angebot bieten
    // GET(ALL): Alle Angebote
    // GET(ALL): Alle Gesuche
}