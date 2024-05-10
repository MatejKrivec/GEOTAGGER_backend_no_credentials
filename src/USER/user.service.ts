import { Inject, Injectable } from "@nestjs/common";
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
          return null; // User not found
      }

      const isPasswordValid = await this.passwordService.comparePassword(password, user.password);

      if (isPasswordValid) {
          return user; // Password is valid
      } else {
          return null; // Password is invalid
      }
  }

  async getUserById(id: number): Promise<USER> {
      return this.prisma.uSER.findUnique({ where: { id } });
  }

  async validatePassword(id: number, currentPassword: string): Promise<boolean> {
    const user = await this.prisma.uSER.findUnique({ where: { id } });
    //console.log(user)
    //console.log("current password: "+ currentPassword)
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
              password: hashedPassword // Hash the password before saving
          }
      });
    }

    /*async updateUser(params: {
        where: Prisma.USERWhereUniqueInput;
        data: Prisma.USERUpdateInput;
    }): Promise<USER> {
        const { where, data } = params;
        return this.prisma.uSER.update({
            data,
            where,
        });
    }*/

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

    async deleteUser(where: Prisma.USERWhereUniqueInput): Promise<USER> {
        return this.prisma.uSER.delete({
          where,
        });
    }
}