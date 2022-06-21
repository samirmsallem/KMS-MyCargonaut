import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import {UsersService} from "./users.service";
import {getModelToken} from "@nestjs/mongoose";
import {User} from "./user.model";

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



  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
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

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
