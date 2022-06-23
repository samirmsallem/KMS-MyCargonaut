/* eslint-disable */
import {Controller, Post, Body, UseGuards, Request, Get, Put, Delete} from '@nestjs/common';
import { ListingService } from './listing.service';
import {AuthenticatedGuard} from "../auth/authenticated.guard";

@Controller('api/listings')
export class ListingController {
    constructor(private readonly listingService: ListingService) {}


    // Angebot erstellen
    @UseGuards(AuthenticatedGuard)
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
    @UseGuards(AuthenticatedGuard)
    @Get('/getListing')
    async getListing(
        @Request() req
    ) {
        const listingId = req.id;
        await this.listingService.getListing(listingId);
        return;
    }


    // löschen spezifisches Angebot
    @UseGuards(AuthenticatedGuard)
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
    @UseGuards(AuthenticatedGuard)
    async getAllListings() {
        const listings = await this.listingService.getListings();
        return listings
    }

    // ändern spezifisches Angebot
    @UseGuards(AuthenticatedGuard)
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

    // geht in request controller
    // PUT: Angebot annehmen
    @UseGuards(AuthenticatedGuard)
    @Put('/takeOffer')
    async takeOffer(
        @Request() req
    ) {
        const email = req.email;
        const zeit = req.zeit;
        const bucher = req.bucher;
        const  kosten = req.kosten;


        const result = await this.listingService.takeOffer(
            email,
            zeit,
            bucher,
            kosten,

        );

        return result;
    }


    // POST: Angebot bieten
    @UseGuards(AuthenticatedGuard)
    @Post('/giveOffer')
    async giveOffer(
        @Request() req
    ) {
        const email = req.email; // email des Anbieters
        const bucher = "free";

        const zeit = req.zeit;
        const  kosten = req.kosten;
        const  sitzplaetze = req.sitzplaetze;
        const  frachtplatz = req.frachtplatz;
        const  startort = req.startort;
        const  ziel = req.ziel;

        await this.listingService.giveOffer(
            email,
            zeit,
            bucher,
            kosten,
            sitzplaetze,
            frachtplatz,
            startort,
            ziel
        );
    }

}