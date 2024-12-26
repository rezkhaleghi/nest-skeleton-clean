// src/api/controllers/auth.controller.ts
import {
  Controller,
  Post,
  Body,
  Res,
  UsePipes,
  ValidationPipe,
  Get,
} from '@nestjs/common';
import { AuthService } from '../../../application/services/auth.service';
import { AuthDto } from '../../../application/DTOs/auth.dto';
import { ResponseDto } from '../../../application/DTOs/response.dto';
import { Response } from 'express';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('')
  @UsePipes(new ValidationPipe())
  async authenticate(
    @Res() res: Response,
    @Body() authDto: AuthDto,
  ): Promise<Response> {
    try {
      const authResponse = await this.authService.authenticate(authDto);

      console.log('authResponse', authResponse);

      res.cookie('accessToken', authResponse.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      });

      const response = new ResponseDto(true, 'Authentication successful', 200, {
        exist: authResponse.exist,
        userId: authResponse.userId,
      });
      return res.status(200).json(response);
    } catch (error) {
      const response = new ResponseDto(
        false,
        'Authentication failed',
        500,
        {},
        error.message,
      );
      return res.status(500).json(response);
    }
  }

  @Get('logout')
  async logout(@Res() res: Response): Promise<Response> {
    res.clearCookie('accessToken');
    const response = new ResponseDto(true, 'Logout successful', 200, {});
    return res.status(200).json(response);
  }
}
