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
        expiryTime: new Date(Date.now() + 3600000), // 1 hour expiry
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

    // Check token expiry
    if (resetToken.expiryTime < new Date()) {
      throw new Error('Token expired');
    }
    return { userId: resetToken.userId.toString() };
  }

  async create(createPasswordResetTokenDto: CreatePasswordResetTokenDto): Promise<void> {
    const { userId } = createPasswordResetTokenDto;
    const expiryTime = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes from now
    const token = '123456';
    await this.prisma.passwordResetToken.create({
      data: {
        userId,
        token,
        expiryTime,
      },
    });
  }

 /* private async sendResetEmail(email: string, resetToken: string): Promise<void> {
    const templateParams = {
      to_email: email,
      reset_token: resetToken,
    };

    const emailJsParams = {
      service_id: 'service_i9xgff5',
      template_id: 'template_4bxr3mo',
      user_id: '_KPuJB7RzCni2V7la',
      template_params: templateParams,
    };

    try {
      await axios.default.post('https://api.emailjs.com/api/v1.0/email/send', emailJsParams);
      console.log("Reset email sent successfully.");
    } catch (error) {
      console.error("Error sending reset email:", error.response?.data?.error);
      throw new Error('Error sending reset email');
    }
  }*/
}
