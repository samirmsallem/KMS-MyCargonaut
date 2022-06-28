import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import {User} from "./user.model";
import {UsersController} from "./users.controller";
import {getModelToken} from "@nestjs/mongoose";
import {Vehicle} from "./vehicles.model";

describe('UsersService', () => {
  let service: UsersService;

  const mockUser = (
      _id = '1',
      firstname = 'Test',
      lastname = 'Test',
      email = 'Test',
      password  = 'Test',
      description = 'Test',
      coins = 1337,
      stars = [],
      avStars = 5,
      evaluations = [],
  ): User => <User>({
    _id,
    firstname,
    lastname,
    email,
    password,
    description,
    coins,
    stars,
    avStars,
    evaluations,
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
        UsersService,
        {
          provide: getModelToken('User'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockUser()),
            constructor: jest.fn().mockResolvedValue(mockUser()),
            find: jest.fn().mockResolvedValue(mockUser()),
            findOne: jest.fn().mockResolvedValue(mockUser()),
            findOneAndUpdate: jest.fn(),
            update: jest.fn(),
            create: jest.fn(),
            remove: jest.fn(),
            exec: jest.fn(),
            save: jest.fn().mockResolvedValue(mockUser())
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

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return user', () => {
    service.getUser(mockUser().email).then(data => {
      expect(data).toStrictEqual(mockUser())
    }).catch(error => {
      throw error
    })
  });

  it('should return all users', () => {
    service.getAll().then(data => {
      expect(data).toStrictEqual(mockUser())
    }).catch(error => {
      throw error
    })
  });

  it('should insert user', () => {
    service.insertUser(mockUser().firstname, mockUser().lastname, mockUser().email, mockUser().password, mockUser().description, mockUser().coins).then(data => {
      expect(data).toEqual(mockUser()._id)
    }).catch(error => {
      throw error
    })
  });

  it('should return user coin count', () => {
    service.getCoins(mockUser().email).then(data => {
      expect(data.coins).toStrictEqual(mockUser().coins)
    }).catch(error => {
      throw error
    })
  });


  it('should return evauations', () => {
    service.getUser(mockUser().email).then(data => {
      expect(data.evaluations).toStrictEqual(mockUser().evaluations)
    }).catch(error => {
      throw error
    })
  });

  it('should insert evauation', () => {
    service.insertEvaluation(mockUser().email, 5, "Second User")
    service.getUser(mockUser().email).then(data => {
      expect(data).toStrictEqual(mockUser())
    }).catch(error => {
      throw error
    })
  });
});
