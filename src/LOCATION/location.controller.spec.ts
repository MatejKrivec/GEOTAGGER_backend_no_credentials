import { Test, TestingModule } from '@nestjs/testing';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { CreateLocationDto } from './createLocation.dto';
import { Location } from '@prisma/client';

describe('LocationController', () => {
  let controller: LocationController;
  let service: LocationService;

  const mockLocationService = {
    create: jest.fn((data) => Promise.resolve({ id: Date.now(), ...data })),
    findAll: jest.fn(() => Promise.resolve([])),
    findOne: jest.fn((id) => Promise.resolve({ id, name: 'Test Location', location: 'Test Location', photo: 'Test Photo', userID: 1, date: new Date() })),
    findLocations: jest.fn((id) => Promise.resolve([])),
    findUserLocations: jest.fn((id) => Promise.resolve([])),
    update: jest.fn((id, data) => Promise.resolve({ id, ...data })),
    remove: jest.fn((id) => Promise.resolve({ id })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocationController],
      providers: [
        {
          provide: LocationService,
          useValue: mockLocationService,
        },
      ],
    }).compile();

    controller = module.get<LocationController>(LocationController);
    service = module.get<LocationService>(LocationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a location', async () => {
      const createLocationDto: CreateLocationDto = {
        userID: 1,
        name: 'Test',
        location: 'Test Location',
        photo: 'Test Photo',
        date: new Date()
      };
      const expectedResult: Location = {
        id: expect.any(Number), 
        ...createLocationDto
      };
  
      jest.spyOn(service, 'create').mockResolvedValue(expectedResult);
  
      const result = await controller.create(createLocationDto);
      expect(result).toEqual(expectedResult);
      expect(service.create).toHaveBeenCalledWith(createLocationDto);
    });
  });
  

  describe('findOne', () => {
    it('should return a single location', async () => {
      const result = await controller.findOne('1');
      expect(result).toMatchObject({ 
        id: 1, 
        name: 'Test Location', 
        location: 'Test Location', 
        photo: 'Test Photo', 
        userID: 1 
      });
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('findLocations', () => {
    it('should return an array of locations', async () => {
      const result = await controller.findLocations('1');
      expect(result).toEqual([]);
      expect(service.findLocations).toHaveBeenCalledWith(1);
    });
  });

  describe('findUserLocations', () => {
    it('should return an array of user locations', async () => {
      const result = await controller.findUserLocations('1');
      expect(result).toEqual([]);
      expect(service.findUserLocations).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update a location', async () => {
      const dto = { name: 'Updated Name' };
      const result = await controller.update('1', dto);
      expect(result).toEqual({ id: 1, name: 'Updated Name' });
      expect(service.update).toHaveBeenCalledWith(1, dto);
    });
  });

  describe('remove', () => {
    it('should remove a location', async () => {
      const result = await controller.remove('1');
      expect(result).toEqual({ id: 1 });
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
