import {Controller, Post, Body, UseGuards, Request, Get, Put, Delete} from '@nestjs/common';
import { ListingService } from './listing.service';

@Controller('api/listings')
export class ListingController {
    constructor(private readonly listingService: ListingService) {}


    // Angebot erstellen
    @Post('/createListing')
    async addListing(
        @Body('email') email: string,
        @Body('zeit') zeit: Date,
        @Body('kosten') kosten: number,
        @Body('sitzplaetze') sitzplaetze: number,
        @Body('frachtplatz') frachtplatz: number,
        @Body('startort') startort: string,
        @Body('ziel') ziel: string,
    ) {
        const generatedId = await this.listingService.insertListing(
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
        const email = req.email;
        const zeit = req.zeit;
        const  kosten = req.kosten;
        const  sitzplaetze = req.sitzplaetze;
        const  frachtplatz = req.frachtplatz;
        const  startort = req.startort;
        const  ziel = req.ziel;
        //const id = req.id;
        await this.listingService.updateListing(
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
        // email string free
        const email = req.email;
        const zeit = req.zeit;

        const  kosten = req.kosten;
        const  sitzplaetze = req.sitzplaetze;
        const  frachtplatz = req.frachtplatz;
        const  startort = req.startort;
        const  ziel = req.ziel;

        await this.listingService.takeOffer(
            email,
            zeit,
            kosten,
            sitzplaetze,
            frachtplatz,
            startort,
            ziel
        );
    }


    // POST: Angebot bieten
    @Post('/giveOffer')
    async giveOffer(
        @Request() req
    ) {
        const email = req.email; // email des Anbieters
        const zeit = req.zeit;
        const  kosten = req.kosten;
        const  sitzplaetze = req.sitzplaetze;
        const  frachtplatz = req.frachtplatz;
        const  startort = req.startort;
        const  ziel = req.ziel;
        //const id = req.id;

        await this.listingService.giveOffer(
            email,
            zeit,
            kosten,
            sitzplaetze,
            frachtplatz,
            startort,
            ziel
        );
    }

}