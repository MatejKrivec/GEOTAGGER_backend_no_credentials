// auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/PRISMA/prisma.module';
import { PrismaService } from '../PRISMA/prisma.service';

import { DecodeController } from './decode.controller';
import { PasswordService } from '../USER/password.service';
import { JwtAuthGuard } from './jwt-auth.guard';



@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_TOKEN_SECRET_KEY, 
      signOptions: { expiresIn: '1h' }, 
    }),
  ],
  providers: [AuthService, JwtStrategy, PrismaService, PasswordService, JwtAuthGuard],
  controllers: [AuthController, DecodeController],
  exports: [JwtAuthGuard]
  
})
export class AuthModule {}