import { Controller, Post } from '@nestjs/common';
import dotenv from 'dotenv';
import { AuthService } from './auth.service';

dotenv.config();

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post()
    async getPayload() {
        return this.authService.sendPayload();
    }
}

