import { PrismaService } from '../PRISMA/prisma.service';
import { CreatePasswordResetTokenDto } from './createToken.dto';
export declare class PasswordResetService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    requestPasswordReset(email: string): Promise<{
        resetToken: string;
        userId: string;
    }>;
    validateToken(token: string): Promise<{
        userId: string;
    }>;
    create(createPasswordResetTokenDto: CreatePasswordResetTokenDto): Promise<void>;
}
