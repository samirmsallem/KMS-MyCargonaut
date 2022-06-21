import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import {User} from "./user.model";
import {UsersController} from "./users.controller";
import {getModelToken} from "@nestjs/mongoose";

describe('UsersService', () => {
  let service: UsersService;

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
        UsersService,
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

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
