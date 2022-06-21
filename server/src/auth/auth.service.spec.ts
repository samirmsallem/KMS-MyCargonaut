import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service'
import {getModelToken} from "@nestjs/mongoose";
import {User} from "../users/user.model";
import {Vehicle} from "../users/vehicles.model";

describe('AuthService', () => {
  let service: AuthService;

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
      providers: [AuthService, UsersService, {
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
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
