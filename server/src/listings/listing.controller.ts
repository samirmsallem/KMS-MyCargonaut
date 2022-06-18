import {Controller, Post, Body, UseGuards, Request, Get, Put, Delete} from '@nestjs/common';
import { ListingService } from './listing.service';

@Controller('api/listings')
export class ListingController {
    constructor(private readonly listingService: ListingService) {}

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

    @Get('/getListing')
    async getListing(
        @Request() req
    ) {
        const listingId = req.listing.id;
        await this.listingService.getListing(listingId);
        return;
    }

    @Delete('/deleteListing')
    async deleteListing(
        @Body('id') listingID: string,
    ) {
        await this.listingService.deleteListing(
            listingID
        );
        return;
    }

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
}