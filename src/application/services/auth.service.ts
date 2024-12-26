// src/api/services/auth.service.ts
import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../domain/entities/user.entity';
import { AuthDto } from '../DTOs/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async authenticate(
    authDto: AuthDto,
  ): Promise<{ accessToken: string; userId: string; exist: boolean }> {
    const { email, password } = authDto;
    let user: User;
    try {
      user = await this.userModel.findOne({ email }).exec();
      if (user) {
        console.log('user exists', user);

        // User exists, attempt to log in
        const { accessToken, userId } = await this.login(user, password);
        return { accessToken, userId, exist: true };
      } else {
        console.log('user does not exist');

        // User does not exist, register new user
        const { accessToken, userId } = await this.register(authDto);

        return { accessToken, userId, exist: false };
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  private async register(
    registerDto: AuthDto,
  ): Promise<{ accessToken: string; userId: string }> {
    const { email, password } = registerDto;
    console.log('registerDto', registerDto);

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new this.userModel({
        email,
        password: hashedPassword,
      });

      await newUser.save();
      const payload = { email: newUser.email, sub: newUser._id };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken, userId: newUser._id.toString() };
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  private async login(
    user: User,
    password: string,
  ): Promise<{ accessToken: string; userId: string }> {
    try {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload = { email: user.email, sub: user._id };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken, userId: user._id.toString() };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
