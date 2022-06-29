/* eslint-disable */
import { Test, TestingModule } from '@nestjs/testing';
import { ListingController } from './listing.controller';
import {ListingService} from "./listing.service";
import {getModelToken} from "@nestjs/mongoose";
import {Listing} from "./listing.model";
import {Vehicle} from "../users/vehicles.model";
import {User} from "../users/user.model";

describe('ListingsController', () => {
    let controller: ListingController;

    const mockListing = (
        ersteller= "123123123",
        bucher= "123123123",
        angenommen = false,
        zeit = new Date(),
        kosten = 5,
        sitzplaetze = 5,
        frachtplatz = 5,
        startort = "A",
        ziel = "B",
        commentar = "schnellstmöglich"
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
        commentar

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
            controllers: [ListingController],
            providers: [
                ListingService,
                {
                    provide: getModelToken('Listing'),
                    useValue: {
                        new: jest.fn().mockResolvedValue(mockListing()),
                        constructor: jest.fn().mockResolvedValue(mockListing()),
                        find: jest.fn(),
                        findOne: jest.fn(),
                        update: jest.fn(),
                        create: jest.fn(),
                        remove: jest.fn(),
                        exec: jest.fn(),
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
                    },
                }

            ]
        }).compile();

        controller = module.get<ListingController>(ListingController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
