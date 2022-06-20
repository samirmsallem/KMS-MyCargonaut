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
        const listingId = req.id;
        await this.listingService.getListing(listingId);
        return;
    }


    // löschen spezifisches Angebot
    @Delete('/deleteListing')
    async deleteListing(
        @Request() req
    ) {
        const listingID = req.id
        await this.listingService.deleteListing(
            listingID
        );
        return;
    }

    @Get('/getAllListings')
    async getAllListings() {
        const listings = await this.listingService.getListings();
        return listings
    }

    // ändern spezifisches Angebot
    @Put('/updateListing')
    async updateListing(
        @Request() req
    ) {
        const  kosten = req.kosten;
        const  sitzplaetze = req.sitzplaetze;
        const  frachtplatz = req.frachtplatz;
        const  startort = req.startort;
        const  ziel = req.ziel;
        const id = req.id;
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

}