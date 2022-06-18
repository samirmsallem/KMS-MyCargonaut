import {Controller, Post, Body, UseGuards, Request, Get, Put, Delete} from '@nestjs/common';
import { ListingService } from './listing.service';

@Controller('api/listings')
export class ListingController {
    constructor(private readonly listingService: ListingService) {}


    // Angebot erstellen
    @Post('/createListing')
    async addListing(
        @Body('kosten') kosten: number,
        @Body('sitzplaetze') sitzplaetze: number,
        @Body('frachtplatz') frachtplatz: number,
        @Body('startort') startort: string,
        @Body('ziel') ziel: string,
    ) {
        const generatedId = await this.listingService.insertListing(
            kosten,
            sitzplaetze,
            frachtplatz,
            startort,
            ziel,
        );
        return {id: generatedId}
    }


    // get spezifisches Angebot
    @Get('/getListing')
    async getListing(
        @Request() req
    ) {
        const listingId = req.listing.id;
        await this.listingService.getListing(listingId);
        return;
    }


    // löschen spezifisches Angebot
    @Delete('/deleteListing')
    async deleteListing(
        @Body('id') listingID: string,
    ) {
        await this.listingService.deleteListing(
            listingID
        );
        return;
    }


    // ändern spezifisches Angebot
    @Put('/updateListing')
    async updateListing(
        @Body('kosten') kosten: number,
        @Body('sitzplaetze') sitzplaetze: number,
        @Body('frachtplatz') frachtplatz: number,
        @Body('startort') startort: string,
        @Body('ziel') ziel: string,
        @Request() req
    ) {
        const id = req.listing.id;
        await this.listingService.updateListing(
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