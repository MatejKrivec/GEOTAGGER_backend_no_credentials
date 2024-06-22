import { AuthService } from './auth.service';
export declare class DecodeController {
    private readonly authService;
    constructor(authService: AuthService);
    decodeToken(token: string): {
        id: any;
        username: string | string[];
        error?: undefined;
    } | {
        error: string;
        id?: undefined;
        username?: undefined;
    };
}
