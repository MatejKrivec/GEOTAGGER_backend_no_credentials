// oauth.service.ts
import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class OAuthService {
  async generateToken(payload: any): Promise<string> {
    const secretKey = process.env.JWT_TOKEN_SECRET_KEY
    return jwt.sign(payload, secretKey);
  }
}