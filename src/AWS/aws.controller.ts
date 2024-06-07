import { Body, Controller, Delete, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AwsService } from './aws.service';
import { MulterFile } from 'multer'; // Adjust the import statement
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/JWT/jwt-auth.guard';

@ApiTags('AWS')
@Controller('aws')
export class AwsController {
  constructor(private readonly awsService: AwsService) {}

  @Post('upload-profile-pic')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('profilePic'))
  async uploadProfilePic(@UploadedFile() file: MulterFile, @Body('userId') userId: string, @Body('key') key: string) { 
    try {
      if (!file) {
        throw new Error('No file uploaded');
      }

      const imageUrl = await this.awsService.uploadProfilePic(file, key);

      await this.awsService.deleteProfilePic(userId, key);


      return { imageUrl };
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new Error('Error uploading image');
    }
  }

  @Post('upload-location-pic')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('locationPic'))
  async uploadLocationPic(@UploadedFile() file: MulterFile, @Body('key') key: string) { 
    try {
      if (!file) {
        throw new Error('No file uploaded');
      }

      const imageUrl = await this.awsService.uploadProfilePic(file, key);

      return { imageUrl };
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new Error('Error uploading image');
    }
  }

  @Post('edit-location-pic')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('locationPic'))
  async editLocationPic(@UploadedFile() file: MulterFile, @Body('locationID') locationID: string, @Body('key') key: string) { 
    try {
      if (!file) {
        throw new Error('No file uploaded');
      }
      const imageUrl = await this.awsService.uploadProfilePic(file, key);

      await this.awsService.deleteLocationPic(locationID, key);


      return { imageUrl };
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new Error('Error uploading image');
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string, @Body('key') key: string) {
    try {
    //  console.log("id:" + id + " photo:" +key)
      await this.awsService.deleteLocationPic(id,key);
      return { message: 'Location picture deleted successfully' };
    } catch (error) {
      console.error('Error deleting location picture:', error);
      throw new Error('Failed to delete location picture');
    }
  }

}


