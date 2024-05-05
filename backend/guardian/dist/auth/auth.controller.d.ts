import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    getPayload(): Promise<import("xumm-sdk/dist/src/types").CreatedPayload>;
}
