import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import * as multer from 'multer';
import { MulterFile } from 'multer';
import { PrismaService } from '../PRISMA/prisma.service';


@Injectable()
export class AwsService {
 
  //Here we create the constructor and s3 instance with the credentials

  async uploadProfilePic(file: MulterFile,key: string): Promise<string> { 
    const uploadParams: S3.Types.PutObjectRequest = {
      Bucket: 'geotagger',
      Key: `${key}${file.originalname}`,
      Body: file.buffer,
      ACL: 'public-read', 
      ContentType: file.mimetype
    };

    const data = await this.s3.upload(uploadParams).promise();
    return data.Location;
  }

  async deleteProfilePic(userId: string, keyy: string): Promise<void> {
    try {
      const user = await this.prisma.uSER.findUnique({
        where: {
          id: parseInt(userId),
        },
      });


      if (!user || !user.profilePic) {
        throw new Error('User or profile picture not found');
      }

      if (user.profilePic === 'https://geotagger.s3.eu-north-1.amazonaws.com/UserImages/default_user_pic.jpg') {
      console.log('Profile picture is the default user pic. Skipping deletion.');
      return; 
    }

      const fileName = user.profilePic.split('/').pop(); 
    const key = `${keyy}${fileName}`; 

      await this.s3.deleteObject({ Bucket: 'geotagger', Key: key }).promise();
    } catch (error) {
      console.error('Error deleting profile picture:', error);
      throw new Error('Error deleting profile picture');
    }
  }

  async deleteLocationPic(locationID: string, keyy: string): Promise<void> {
    try {
      const location = await this.prisma.location.findUnique({
        where: {
          id: parseInt(locationID),
        },
      });


      if (!location || !location.photo) {
        throw new Error('User or location picture not found');
      }

      const fileName = location.photo.split('/').pop(); 
      const key = `${keyy}${fileName}`; 

     // console.log("kljuc:"+key)

      await this.s3.deleteObject({ Bucket: 'geotagger', Key: key }).promise();
      
    } catch (error) {
      console.error('Error deleting location picture:', error);
      throw new Error('Error deleting location picture');
    }
  }
}