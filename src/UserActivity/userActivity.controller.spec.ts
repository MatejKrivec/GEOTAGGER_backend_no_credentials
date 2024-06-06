import { Test, TestingModule } from '@nestjs/testing';
import { UserActivityController } from './userActivity.controller';
import { UserActivityService } from './userActivity.service';
import { Prisma, UserActivity } from '@prisma/client';
import { PrismaService } from '../PRISMA/prisma.service';

describe('UserActivityController', () => {
  let controller: UserActivityController;
  let service: UserActivityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserActivityController],
      providers: [
        {
          provide: UserActivityService,
          useValue: {
            logActivity: jest.fn().mockImplementation((data) => Promise.resolve({
              id: Date.now(),
              ...data,
              createdAt: new Date(),
            })),
            // Add other methods if needed
          },
        },
      ],
    }).compile();

    controller = module.get<UserActivityController>(UserActivityController);
    service = module.get<UserActivityService>(UserActivityService);
  });

  describe('logActivity', () => {
    it('should log user activity', async () => {
      const activityData = {
        userId: 1,
        action: 'Test Action',
        componentType: 'Test Component',
        newValue: 'Test New Value',
        location: 'Test Location',
        createdAt: new Date(),
      };
      // Mock the logActivity method before calling it
      service.logActivity = jest.fn().mockResolvedValue({
        id: 1,
        ...activityData,
      });

      const result = await controller.logActivity(activityData);
      expect(result).toEqual(expect.objectContaining(activityData));
      expect(service.logActivity).toHaveBeenCalledWith(activityData);
    });
  });


  describe('getLatestActivities', () => {
    it('should return the latest user activities', async () => {
      const expectedResult = [
        // ... your expected results
      ];
      // Mock the getLatestActivities method before calling it
      service.getLatestActivities = jest.fn().mockResolvedValue(expectedResult);
  
      const result = await controller.getLatestActivities();
  
      expect(result).toEqual(expectedResult);
      expect(service.getLatestActivities).toHaveBeenCalled();
    });
  });
  
});
