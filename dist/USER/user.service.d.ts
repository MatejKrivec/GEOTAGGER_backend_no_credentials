import { PrismaService } from "../PRISMA/prisma.service";
import { Prisma, USER } from "@prisma/client";
import { PasswordService } from "./password.service";
export declare class UserService {
    private prisma;
    private passwordService;
    constructor(prisma: PrismaService, passwordService: PasswordService);
    getAllUsers(): Promise<USER[]>;
    findOneByUsernameAndPassword(username: string, password: string): Promise<USER | null>;
    getUserById(id: number): Promise<USER>;
    validatePassword(id: number, currentPassword: string): Promise<boolean>;
    createUser(data: Prisma.USERCreateInput): Promise<USER>;
    posodobitevUser(params: {
        where: Prisma.USERWhereUniqueInput;
        data: Prisma.USERUpdateInput;
    }): Promise<USER>;
    updatePassword(id: number, newPassword: string): Promise<void>;
    updateUserPoints(id: string, points: number): Promise<void>;
    uaddUserPoints(id: string, points: number): Promise<void>;
    deleteUser(where: Prisma.USERWhereUniqueInput): Promise<USER>;
}
