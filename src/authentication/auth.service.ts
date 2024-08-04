import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Helpers from 'src/common/helpers/helpers.helper';
import { MoreThan, Repository } from 'typeorm';
import { UserLoginDto } from './user_login.dto';
import { User } from 'src/module/user/user.entity';
import { UserDto } from 'src/module/user/user.dto';
import { UserService } from 'src/module/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { Token } from 'src/module/token/token.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @InjectRepository(Token)
    private readonly tokenRepo: Repository<Token>,
  ) {}

  async register(userdto: UserDto): Promise<User> {
    try {
      const { name, email, password } = userdto;

      //check email is registered
      const existingEmail = await this.userRepo.findOne({ where: { email } });
      if (existingEmail) {
        throw new BadRequestException(
          'Email already registered. Please enter a different one.',
        );
      }

      //converting password
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = this.userRepo.save({
        name,
        email,
        password: hashedPassword,
      });
      return Helpers.sendCreated(user, 'User registered successfully.');
    } catch (error) {
      return Helpers.sendBadRequest('Registration failed.');
    }
  }

  async login({ email, password }) {
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      return Helpers.sendNotFound('User not found.');
    }

    const passWordMatch = await bcrypt.compare(password, user.password);
    if (!passWordMatch) {
      throw Helpers.sendBadRequest('Invalid credentials');
    }

    const refershToken = await this.generateUserTokens(user.id);

    await this.userRepo.save(user);

    const res = {
      ...user,
    };
    return Helpers.sendOk(res, 'Login successfully.');
  }

  async generateUserTokens(userId) {
    const accessToken = this.jwtService.sign({ userId }, { expiresIn: '1h' });
    const refreshToken = uuidv4();
    await this.storeRefreshToken(userId, refreshToken);
    return {
      accessToken,
      refreshToken,
    };
  }

  async storeRefreshToken(userId: string, refreshToken: string) {
    const expDate = new Date();
    expDate.setDate(expDate.getDate() + 3);

    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) {
      throw new Error('User not found');
    }

    let token = await this.tokenRepo.findOneBy({ refreshToken, user });

    if (token) {
      token.expiryDate = expDate;
      await this.tokenRepo.save(token);
    } else {
      await this.tokenRepo.create({
        refreshToken,
        user,
        expiryDate: expDate,
      });
    }
  }

  async refreshToken(refershToken: string) {
    const token = await this.tokenRepo.findOne({
      where: {
        refreshToken: refershToken,
        expiryDate: MoreThan(new Date()),
      },
    });

    if (!token) {
      throw new UnauthorizedException('Token is invalid or expired');
    }

    // if we find token then we have to delete it because one user will have 2 tokens
    await this.tokenRepo.remove(token);

    const user = token.user;
    return this.generateUserTokens(user);
  }

  async logout(id: string) {
    const user = await this.userRepo.findOne({ where: { id: id } });
    if (!user) return Helpers.sendNotFound('User not found.');

    if (user && user.token) {
      await this.userRepo.save(user);
    } else {
      return Helpers.sendBadRequest('User already logged out... ');
    }

    return Helpers.sendOk(null, 'Logout successfully.');
  }
}
