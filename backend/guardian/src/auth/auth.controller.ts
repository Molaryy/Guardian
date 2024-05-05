import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post()
    async getPayload() {
        return this.authService.sendPayload();
    }
}

