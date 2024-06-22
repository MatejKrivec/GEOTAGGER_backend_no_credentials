import { AuthService } from './auth.service';
import { JwtPayload } from 'jsonwebtoken';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(req: any): Promise<{
        error: string;
        token?: undefined;
    } | {
        token: string;
        error?: undefined;
    }>;
    protectedRoute(req: any): Promise<{
        route: string;
    }>;
    verifyToken(req: any): Promise<{
        valid: boolean;
        decodedToken: string | JwtPayload;
        error?: undefined;
    } | {
        valid: boolean;
        error: any;
        decodedToken?: undefined;
    }>;
}
