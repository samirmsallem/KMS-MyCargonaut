/* eslint-disable */
import { Test, TestingModule } from '@nestjs/testing';
import { ListingService } from './listing.service';
import {User} from "../users/user.model";
import {ListingController} from "./listing.controller";
import {getModelToken} from "@nestjs/mongoose";
import {Vehicle} from "../users/vehicles.model";
import {Listing} from "./listing.model";
import mock = jest.mock;

describe('ListingService', () => {
    let service: ListingService;

    const mockListing = (
        ersteller= "123123123",
        bucher= "123123123",
        angenommen = false,
        zeit = new Date(),
        kosten = 5,
        sitzplaetze = 5,
        frachtplatz = 5,
        startort = "A",
        ziel = "B"
    ): Listing => <Listing>({
        bucher,
        zeit,
        kosten,
        sitzplaetze,
        frachtplatz,
        startort,
        ziel,
        angenommen,
        ersteller,

    });

    const mockListingOne = (
        ersteller= "123123123",
        bucher= "123123123",
        angenommen = true,
        zeit = new Date(),
        kosten = 6,
        sitzplaetze = 6,
        frachtplatz = 6,
        startort = "Macao",
        ziel = "Kiel"
    ): Listing => <Listing>({
        bucher,
        zeit,
        kosten,
        sitzplaetze,
        frachtplatz,
        startort,
        ziel,
        angenommen,
        ersteller,

    });

    const mockListingTwo = (
        ersteller= "123123123",
        bucher= "1",
        angenommen = false,
        zeit = new Date(),
        kosten = 6,
        sitzplaetze = 6,
        frachtplatz = 6,
        startort = "A",
        ziel = "B"
    ): Listing => <Listing>({
        bucher,
        zeit,
        kosten,
        sitzplaetze,
        frachtplatz,
        startort,
        ziel,
        angenommen,
        ersteller,

    });

    const mockUser = (
        _id = '1',
        firstname = 'Test',
        lastname = 'Test',
        email = 'Test',
        password  = 'Test',
        description = 'Test',
    ): User => <User>({
        _id,
        firstname,
        lastname,
        email,
        password,
        description,
    });


    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ListingService,
                {
                    provide: getModelToken('Listing'),
                    useValue: {
                        new: jest.fn().mockResolvedValue(mockListing()),
                        constructor: jest.fn().mockResolvedValue(mockListing()),
                        find: jest.fn().mockResolvedValue(mockListing()),
                        findOne: jest.fn().mockResolvedValue(mockListing()),
                        findOneAndDelete: jest.fn().mockResolvedValue(mockListing()),
                        findOneAndUpdate: jest.fn().mockResolvedValue(mockListingTwo()),
                        update: jest.fn(),
                        create: jest.fn(),
                        remove: jest.fn(),
                        exec: jest.fn(),
                        findById: jest.fn().mockResolvedValue(mockListing())
                    },
                },
                {
                    provide: getModelToken('User'),
                    useValue: {
                        new: jest.fn().mockResolvedValue(mockUser()),
                        constructor: jest.fn().mockResolvedValue(mockUser()),
                        find: jest.fn(),
                        findOne: jest.fn(),
                        update: jest.fn(),
                        create: jest.fn(),
                        remove: jest.fn(),
                        exec: jest.fn(),
                        findOneAndUpdate: jest.fn().mockResolvedValue(mockUser())
                    },
                }
            ]
        }).compile();

        service = module.get<ListingService>(ListingService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    // todo fix

    // it('should return listng', () => {
    //     service.getListing(mockListing()._id).then(data => {
    //         expect(data).toEqual(mockListing())
    //     }).catch(error => {
    //         throw error // time problem
    //     })
    // });
    //
    // it('should return all listings', () => {
    //     service.getListings(mockUser()).then(data => {
    //         expect(data).toStrictEqual(mockListing())
    //     }).catch(error => { // exec is not a func
    //         throw error
    //     })
    // });
    //
    // it('should insert listing', () => {
    //     service.insertListing(mockListing().zeit,mockListing().bucher,mockListing().kosten,mockListing().sitzplaetze,mockListing().frachtplatz,mockListing().startort,mockListing().ziel,mockListing().ersteller ).then(data => {
    //         expect(data).toEqual(mockListing()._id)
    //     }).catch(error => { // listingModel is not a constructor
    //         throw error
    //     })
    // });
    //
    // // delete listing
    // it('should delete listing', () => {
    //     service.deleteListing(mockListing()._id ).then(data => {
    //         expect(data).toEqual(mockListing())
    //     }).catch(error => { // time problem
    //         throw error
    //     })
    // });
    //
    // // update listing
    // it('should update listing', () => {
    //     service.insertListing(new Date(),mockListing().bucher,mockListing().kosten,mockListing().sitzplaetze,mockListing().frachtplatz,mockListing().startort,mockListing().ziel,mockListing().ersteller);
    //     service.updateListing(new Date(),mockListing().kosten + 1,mockListing().sitzplaetze + 1,mockListing().frachtplatz + 1, "Macao","Kiel", mockListing()._id ).then(data => {
    //         expect(data).toEqual(mockListingOne())
    //     }).catch(error => { // this.listingModel is not a constructor
    //         throw error
    //     })
    // });
    //
    // //take offer
    // it('should take offer', () => {
    //     service.takeOffer(mockListing()._id, mockUser()._id ).then(data => {
    //         expect(data).toEqual(mockListingTwo())
    //     }).catch(error => {
    //         throw error // Received: undefined
    //     })
    // });



});
