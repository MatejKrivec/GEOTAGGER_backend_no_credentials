// auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/Prisma/prisma.service';
import { DecodeController } from './decode.controller';
import { PasswordService } from 'src/USER/password.service';


@Module({
  imports: [
    JwtModule.register({
      secret: '12345', 
      signOptions: { expiresIn: '1h' }, 
    }),
  ],
  providers: [AuthService, JwtStrategy, PrismaService, PasswordService],
  controllers: [AuthController, DecodeController],
  
})
export class AuthModule {}