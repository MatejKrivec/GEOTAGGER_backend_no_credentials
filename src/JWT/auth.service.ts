// auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../Prisma/prisma.service';
import { Prisma, USER } from '@prisma/client';
import { UserService } from 'src/User/user.service';
//import { UserService } from 'src/User/user.service';
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

  
