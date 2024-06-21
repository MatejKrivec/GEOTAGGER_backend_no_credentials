// auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../PRISMA/prisma.service';
import { USER } from '@prisma/client';
import { PrismaModule } from 'src/PRISMA/prisma.module';

import * as jwt from 'jsonwebtoken';
import { PasswordService } from '../USER/password.service';

@Injectable()
export class AuthService {

  private readonly jwtSecret = process.env.JWT_TOKEN_SECRET_KEY;

  verifyToken(token: string) {
    try {
      return jwt.verify(token, this.jwtSecret);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
  
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
    private readonly passwordService: PasswordService,
  ) {}

  async generateToken(payload: any): Promise<string> {
    
    return this.jwtService.sign(payload);
  }

async findOneByUsernameAndPassword(email: string, password: string): Promise<USER | null> {
    const user = await this.prisma.uSER.findUnique({
      where: { email: email },
    });

    if (!user) {
      return null; 
    }

    const isPasswordValid = await this.passwordService.comparePassword(password, user.password);

    if (!isPasswordValid) {
      return null; 
    }

    return user;
  }
}

  
