// src/api/controllers/auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../../../application/services/auth.service';
import { AuthDto } from '../../../application/DTOs/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('authenticate')
  async authenticate(
    @Body() authDto: AuthDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.authenticate(authDto);
  }
}
