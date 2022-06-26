/* eslint-disable */
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import {UsersService} from "./users.service";
import {getModelToken} from "@nestjs/mongoose";
import {User} from "./user.model";
import {Vehicle} from "./vehicles.model";
import {PassportModule} from "@nestjs/passport";

describe('UsersController', () => {
  let controller: UsersController;

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
      controllers: [UsersController],
      providers: [
        UsersService,
        PassportModule,
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
        },
        {
          provide: getModelToken('Vehicle'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockVehicle()),
            constructor: jest.fn().mockResolvedValue(mockVehicle()),
            find: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            create: jest.fn(),
            remove: jest.fn(),
            exec: jest.fn(),
          },
        },
          ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
