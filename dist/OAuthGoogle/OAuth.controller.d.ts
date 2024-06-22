import { OAuthService } from './OAuth.service';
export declare class OAuthController {
    private readonly authService;
    constructor(authService: OAuthService);
    googleLogin(): Promise<void>;
    googleLoginCallback(req: any, res: any): Promise<void>;
}
