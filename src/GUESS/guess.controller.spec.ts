import { Test, TestingModule } from '@nestjs/testing';
import { GuessController } from './guess.controller';
import { GuessService } from './guess.service';
import { PrismaService } from '../PRISMA/prisma.service';

describe('GuessController', () => {
    let controller: GuessController;
    let service: GuessService;
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        controllers: [GuessController],
        providers: [GuessService, PrismaService], // Include PrismaService in the providers array
      }).compile();
  
      controller = module.get<GuessController>(GuessController);
      service = module.get<GuessService>(GuessService);
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a guess', async () => {
      const dto = { 
        UserID: 1, 
        LocationID: 1, 
        guessedLocation: 'Test Location', 
        distance: 10.5, 
        date: new Date() 
      };
      const expectedResult = { 
        id: 1, 
        ...dto 
      };
      jest.spyOn(service, 'create').mockResolvedValue(expectedResult);

      const result = await controller.create(dto);

      expect(result).toEqual(expectedResult);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return all guesses', async () => {
      const expectedResult = [
        { 
          id: 1, 
          UserID: 1, 
          LocationID: 1, 
          guessedLocation: 'Test Location', 
          distance: 10.5, 
          date: new Date() 
        }
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(expectedResult);

      const result = await controller.findAll();

      expect(result).toEqual(expectedResult);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single guess', async () => {
      const id = '1';
      const expectedResult = { 
        id: 1, 
        UserID: 1, 
        LocationID: 1, 
        guessedLocation: 'Test Location', 
        distance: 10.5, 
        date: new Date() 
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(expectedResult);

      const result = await controller.findOne(id);

      expect(result).toEqual(expectedResult);
      expect(service.findOne).toHaveBeenCalledWith(+id);
    });
  });

  describe('findByUser', () => {
    it('should return guesses by user', async () => {
      const id = '1';
      const expectedResult = [
        { 
          id: 1, 
          UserID: 1, 
          LocationID: 1, 
          guessedLocation: 'Test Location', 
          distance: 10.5, 
          date: new Date() 
        }
      ];
      jest.spyOn(service, 'findByUser').mockResolvedValue(expectedResult);

      const result = await controller.findByUser(id);

      expect(result).toEqual(expectedResult);
      expect(service.findByUser).toHaveBeenCalledWith(+id);
    });
  });

  describe('findByLocation', () => {
    it('should return guesses by location', async () => {
      const id = '1';
      const expectedResult = [
        { 
          id: 1, 
          UserID: 1, 
          LocationID: 1, 
          guessedLocation: 'Test Location', 
          distance: 10.5, 
          date: new Date() 
        }
      ];
      jest.spyOn(service, 'findByLocation').mockResolvedValue(expectedResult);

      const result = await controller.findByLocation(id);

      expect(result).toEqual(expectedResult);
      expect(service.findByLocation).toHaveBeenCalledWith(+id);
    });
  });

  describe('countGuesses', () => {
    it('should count guesses by user and location', async () => {
      const userId = '1';
      const locationId = '2';
      const expectedResult = 10; // Mock count
      jest.spyOn(service, 'countGuesses').mockResolvedValue(expectedResult);

      const result = await controller.countGuesses(userId, locationId);

      expect(result).toEqual(expectedResult);
      expect(service.countGuesses).toHaveBeenCalledWith(+userId, +locationId);
    });
  });

  describe('update', () => {
    it('should update a guess', async () => {
      const id = '1';
      const dto = { 
        UserID: 1, 
        LocationID: 2, 
        guessedLocation: 'Updated Location', 
        distance: 20.5, 
        date: new Date() 
      };
      const expectedResult = { 
        id: 1, 
        ...dto 
      };
      jest.spyOn(service, 'update').mockResolvedValue(expectedResult);
  
      const result = await controller.update(id, dto);
  
      expect(result).toEqual(expectedResult);
      expect(service.update).toHaveBeenCalledWith(+id, dto);
    });
  });

  describe('remove', () => {
    it('should remove a guess', async () => {
      const id = '1';
      const expectedResult = { 
        id: 1, 
        UserID: 1, 
        LocationID: 2, 
        guessedLocation: 'Removed Location', 
        distance: 0, 
        date: new Date() 
      };
      jest.spyOn(service, 'remove').mockResolvedValue(expectedResult);
  
      const result = await controller.remove(id);
  
      expect(result).toEqual(expectedResult);
      expect(service.remove).toHaveBeenCalledWith(+id);
    });
  });
  
});
