import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/PRISMA/prisma.service";
import { Prisma, USER } from "@prisma/client";
import { PasswordService } from "./password.service";

@Injectable()
export class UserService {

    constructor(
      private prisma: PrismaService,
      private passwordService: PasswordService
    ){}

    async getAllUsers(): Promise<USER[]> {
      return this.prisma.uSER.findMany();
    }
    
    async findOneByUsernameAndPassword(username: string, password: string): Promise<USER | null> {
      const user = await this.prisma.uSER.findUnique({
          where: {
              username: username
          },
      });

      if (!user) {
          return null; 
      }

      const isPasswordValid = await this.passwordService.comparePassword(password, user.password);

      if (isPasswordValid) {
          return user; 
      } else {
          return null; 
      }
  }

  async getUserById(id: number): Promise<USER> {
      return this.prisma.uSER.findUnique({ where: { id } });
  }

  async validatePassword(id: number, currentPassword: string): Promise<boolean> {
    const user = await this.prisma.uSER.findUnique({ where: { id } });
    if (!user) {
      console.error('User not found');
      return false;
    }
    const isPasswordValid = await this.passwordService.comparePassword(currentPassword, user.password);
    return isPasswordValid;
  }

    async createUser(data: Prisma.USERCreateInput): Promise<USER> {
      const hashedPassword = await this.passwordService.hashPassword(data.password);
      return this.prisma.uSER.create({
          data: {
              ...data,
              password: hashedPassword, 
              profilePic: "https://geotagger.s3.eu-north-1.amazonaws.com/UserImages/default_user_pic.jpg"
          }
      });
    }

    async posodobitevUser(params: {
        where: Prisma.USERWhereUniqueInput;
        data: Prisma.USERUpdateInput;
      }): Promise<USER> {
        const { where, data } = params;
        return this.prisma.uSER.update({
          data,
          where,
        });
    }

    async updatePassword(id: number, newPassword: string): Promise<void> {
      const hashedPassword = await this.passwordService.hashPassword(newPassword);
        await this.prisma.uSER.update({
            where: { id },
            data: { password: hashedPassword },
        });
    }

    async updateUserPoints(id: string, points: number): Promise<void> {
      const userId = parseInt(id);
      const user = await this.prisma.uSER.findUnique({
        where: {
          id: userId,
        },
      });
    
      if (user) {
        let calculatedPoints = user.points - points;
        if (calculatedPoints <= 0) {
          calculatedPoints = 0;
        }
    
        await this.prisma.uSER.update({
          where: { id: userId },
          data: { points: calculatedPoints },
        });
      } else {
        throw new Error('User not found');
      }
    }

    async uaddUserPoints(id: string, points: number): Promise<void> {
      const userId = parseInt(id);
      const user = await this.prisma.uSER.findUnique({
        where: {
          id: userId,
        },
      });
    
        await this.prisma.uSER.update({
          where: { id: userId },
          data: { points: user.points + points },
        });
    }


    async deleteUser(where: Prisma.USERWhereUniqueInput): Promise<USER> {
        return this.prisma.uSER.delete({
          where,
        });
    }
}