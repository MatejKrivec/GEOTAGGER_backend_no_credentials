import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AwsService } from './aws.service';
import { MulterFile } from 'multer'; // Adjust the import statement

@Controller('aws')
export class AwsController {
  constructor(private readonly awsService: AwsService) {}

  @Post('upload-profile-pic')
  @UseInterceptors(FileInterceptor('profilePic'))
  async uploadProfilePic(@UploadedFile() file: MulterFile, @Body('userId') userId: string) { // Adjust the type declaration
    try {
      if (!file) {
        throw new Error('No file uploaded');
      }

      const imageUrl = await this.awsService.uploadProfilePic(file);

      await this.awsService.deleteProfilePic(userId);


      return { imageUrl };
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new Error('Error uploading image');
    }
  }
}
