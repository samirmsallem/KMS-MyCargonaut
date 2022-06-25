/* eslint-disable */
import { Test, TestingModule } from '@nestjs/testing';
import { RequestController } from './request.controller';
import {RequestService} from "./request.service";
import {getModelToken} from "@nestjs/mongoose";
import {Request} from "./request.model";
import {Vehicle} from "../users/vehicles.model";
import {User} from "../users/user.model";

describe('ListingsController', () => {
    let controller: RequestController;

    const mockRequest = (
        email= "abc@thm.de",
        zeit = new Date(),
        kosten = 5,
        sitzplaetze = 5,
        frachtplatz = 5,
        startort = "A",
        ziel = "B"
    ): Request => <Request>({
        email,
        zeit,
        kosten,
        sitzplaetze,
        frachtplatz,
        startort,
        ziel
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
            controllers: [RequestController],
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

        controller = module.get<RequestController>(RequestController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
