// aws.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AwsController } from './aws.controller';
import { AwsService } from './aws.service';

describe('AwsController', () => {
  let awsController: AwsController;
  let awsService: AwsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AwsController],
      providers: [AwsService],
    }).compile();

    awsController = module.get<AwsController>(AwsController);
    awsService = module.get<AwsService>(AwsService);
  });

  it('should be defined', () => {
    expect(awsController).toBeDefined();
  });

  describe('uploadProfilePic', () => {
    it('should return an imageUrl when a file is uploaded', async () => {
      const file = { /* mock file data */ };
      const userId = 'testUserId';
      const key = 'testKey';

      jest.spyOn(awsService, 'uploadProfilePic').mockImplementation(() => Promise.resolve('imageUrl'));
      jest.spyOn(awsService, 'deleteProfilePic').mockImplementation(() => Promise.resolve());

      expect(await awsController.uploadProfilePic(file, userId, key)).toEqual({ imageUrl: 'imageUrl' });
    });
  });

  describe('uploadLocationPic', () => {
    it('should return an imageUrl when a file is uploaded', async () => {
      const file = { /* mock file data */ };
      const locationID = 'testLocationId';
      const key = 'testKey';

      jest.spyOn(awsService, 'uploadProfilePic').mockImplementation(() => Promise.resolve('imageUrl'));
      jest.spyOn(awsService, 'deleteLocationPic').mockImplementation(() => Promise.resolve());

      expect(await awsController.uploadLocationPic(file, locationID, key)).toEqual({ imageUrl: 'imageUrl' });
    });
  });

  describe('remove', () => {
    it('should return a success message when a location picture is deleted', async () => {
      const id = 'testId';
      const key = 'testKey';

      jest.spyOn(awsService, 'deleteLocationPic').mockImplementation(() => Promise.resolve());

      expect(await awsController.remove(id, key)).toEqual({ message: 'Location picture deleted successfully' });
    });
  });
});
