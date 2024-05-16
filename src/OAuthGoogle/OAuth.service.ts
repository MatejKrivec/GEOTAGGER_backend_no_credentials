// oauth.service.ts
import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class OAuthService {
  async generateToken(payload: any): Promise<string> {
    const secretKey = '12345'; // replace with your actual secret key
    return jwt.sign(payload, secretKey);
  }
}