/* eslint-disable */
import {Controller, Post, Body, UseGuards, Request, Get, Put, Delete, Param} from '@nestjs/common';
import { ListingService } from './listing.service';
import {AuthenticatedGuard} from "../auth/authenticated.guard";

@Controller('api/listings')
export class ListingController {
    constructor(private readonly listingService: ListingService) {}


    // Angebot erstellen
    @UseGuards(AuthenticatedGuard)
    @Post('/createListing')
    async addListing(
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
        const generatedId = await this.listingService.insertListing(
            zeit,
            bucher,
            kosten,
            sitzplaetze,
            frachtplatz,
            startort,
            ziel,
            commentar,
            req.user.userEmail
        );
        return {id: generatedId}
    }


    // get spezifisches Angebot
    @UseGuards(AuthenticatedGuard)
    @Get('/getListing/:id')
    async getListing(
       @Param('id') id
    ) {
        return this.listingService.getListing(id);
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
    async getAllListings(@Request() req ) {
      return await this.listingService.getListings(req.user);
    }

    // ändern spezifisches Angebot
    @UseGuards(AuthenticatedGuard)
    @Put('/updateListing')
    async updateListing(
        @Request() req
    ) {
        const zeit = req.zeit;
        const kosten = req.kosten;
        const sitzplaetze = req.sitzplaetze;
        const frachtplatz = req.frachtplatz;
        const startort = req.startort;
        const ziel = req.ziel;
        const id = req.id;
        const commentar = req.commentar;
        await this.listingService.updateListing(
            zeit,
            kosten,
            sitzplaetze,
            frachtplatz,
            startort,
            ziel,
            id,
            commentar
        );
        return;
    }

    // geht in request controller
    // PUT: Angebot annehmen
    @UseGuards(AuthenticatedGuard)
    @Put('/takeOffer')
    async takeOffer(
        @Body('_id') offerId: string,
        @Request() req
    ) {
        const userId = req.user.userEmail;
        const result = await this.listingService.takeOffer(
            offerId,
            userId,
        );

        return result;
    }



}
