import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../PRISMA/prisma.service';
import * as axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import emailjs from 'emailjs-com';
import { CreatePasswordResetTokenDto } from './createToken.dto';

@Injectable()
export class PasswordResetService {
  constructor(private readonly prisma: PrismaService) {}

  async requestPasswordReset(email: string): Promise<{ resetToken: string; userId: string }> {
    const user = await this.prisma.uSER.findUnique({ where: { email } });
    if (!user) {
      console.log("User not found");
      throw new NotFoundException('User not found');
    }

    const resetToken = uuidv4();
    await this.prisma.passwordResetToken.create({
      data: {
        token: resetToken,
        expiryTime: new Date(Date.now() + 3600000), 
        userId: user.id,
      },
    });

    return { resetToken, userId: user.id.toString() };
  }

  async validateToken(token: string): Promise<{ userId: string }> {
    const resetToken = await this.prisma.passwordResetToken.findFirst({ where: { token } });
    if (!resetToken) {
      throw new NotFoundException('Token not found');
    }

    if (resetToken.expiryTime < new Date()) {
      throw new Error('Token expired');
    }
    return { userId: resetToken.userId.toString() };
  }

  async create(createPasswordResetTokenDto: CreatePasswordResetTokenDto): Promise<void> {
    const { userId } = createPasswordResetTokenDto;
    const expiryTime = new Date(Date.now() + 30 * 60 * 1000); 
    const token = '123456';   //TUKAJ BI BIL NEKI RANDOM GENERATED NUMBER
    await this.prisma.passwordResetToken.create({
      data: {
        userId,
        token,
        expiryTime,
      },
    });
  }


}
