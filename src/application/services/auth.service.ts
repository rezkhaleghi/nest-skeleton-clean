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

  async authenticate(authDto: AuthDto): Promise<{ accessToken: string }> {
    const { email, password } = authDto;
    let user: User;

    try {
      user = await this.userModel.findOne({ email }).exec();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }

    if (user) {
      // User exists, attempt to log in
      return this.login(user, password);
    } else {
      // User does not exist, register new user
      return this.register(authDto);
    }
  }

  private async register(
    registerDto: AuthDto,
  ): Promise<{ accessToken: string }> {
    const { email, password } = registerDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new this.userModel({ email, password: hashedPassword });

    try {
      await newUser.save();
      const payload = { email: newUser.email, sub: newUser._id };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken };
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException('Error creating user');
      }
    }
  }

  private async login(
    user: User,
    password: string,
  ): Promise<{ accessToken: string }> {
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    try {
      const payload = { email: user.email, sub: user._id };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
