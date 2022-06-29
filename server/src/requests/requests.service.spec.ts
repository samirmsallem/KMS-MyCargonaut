/* eslint-disable */
import { Test, TestingModule } from '@nestjs/testing';
import { RequestService } from './request.service';
import {User} from "../users/user.model";
import {RequestController} from "./request.controller";
import {getModelToken} from "@nestjs/mongoose";
import {Vehicle} from "../users/vehicles.model";
import {Request} from "./request.model";

describe('RequestService', () => {
    let service: RequestService;

    const mockRequest = (
        sucher= "abc@thm.de",
        bucher = "mail@mail.de",
        zeit = new Date(),
        kosten = 5,
        sitzplaetze = 5,
        frachtplatz = 5,
        startort = "A",
        ziel = "B",
        angenommen = false,
        commentar = "schneller bitte"
    ): Request => <Request>({
        sucher,
        bucher,
        zeit,
        kosten,
        sitzplaetze,
        frachtplatz,
        startort,
        ziel,
        angenommen,
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
                RequestService,
                {
                    provide: getModelToken('Request'),
                    useValue: {
                        new: jest.fn().mockResolvedValue(mockRequest()),
                        constructor: jest.fn().mockResolvedValue(mockRequest()),
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

        service = module.get<RequestService>(RequestService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
