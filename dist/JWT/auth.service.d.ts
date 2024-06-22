import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../PRISMA/prisma.service';
import { USER } from '@prisma/client';
import * as jwt from 'jsonwebtoken';
import { PasswordService } from '../USER/password.service';
export declare class AuthService {
    private jwtService;
    private prisma;
    private readonly passwordService;
    private readonly jwtSecret;
    verifyToken(token: string): string | jwt.JwtPayload;
    constructor(jwtService: JwtService, prisma: PrismaService, passwordService: PasswordService);
    generateToken(payload: any): Promise<string>;
    findOneByUsernameAndPassword(email: string, password: string): Promise<USER | null>;
}
