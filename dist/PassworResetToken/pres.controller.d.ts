import { PasswordResetService } from './pres.service';
import { CreatePasswordResetTokenDto } from './createToken.dto';
import { UserService } from '../USER/user.service';
export declare class PasswordResetController {
    private readonly passwordResetService;
    private readonly userService;
    constructor(passwordResetService: PasswordResetService, userService: UserService);
    requestPasswordReset(email: string): Promise<{
        resetToken: string;
        userId: string;
    }>;
    validateToken(body: {
        token: string;
        newPassword: string;
    }): Promise<{
        userId: string;
    }>;
    create(createPasswordResetTokenDto: CreatePasswordResetTokenDto): Promise<void>;
}
