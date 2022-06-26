/* eslint-disable */
import { Test, TestingModule } from '@nestjs/testing';
import { ListingService } from './listing.service';
import {User} from "../users/user.model";
import {ListingController} from "./listing.controller";
import {getModelToken} from "@nestjs/mongoose";
import {Vehicle} from "../users/vehicles.model";
import {Listing} from "./listing.model";

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

    const mockVehicle = (
        _id = '1',
        model = 'Test',
        space = 1,
        seats = 1,
        email = 'test@mail.de'
    ): Vehicle => <Vehicle>({
        _id,
        model,
        space,
        seats,
        email
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

        service = module.get<ListingService>(ListingService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
