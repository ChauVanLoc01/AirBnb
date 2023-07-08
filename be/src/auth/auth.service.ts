import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { user } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ApiResponse } from 'src/types/ApiResponse.type';
import { omit } from 'lodash';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CreateCacheKey } from 'src/utils/CreateCachekey';
import { LoginResponse } from 'src/types/LoginResponse.type';

@Injectable()
export class AuthService {
  expired_access_token: number;
  expired_refresh_token: number;
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    @Inject(CACHE_MANAGER) private cache: Cache,
  ) {
    this.expired_access_token =
      Number(process.env.EXPIRED_AC_TOKEN) || 1000 * 60 * 60 * 8; // 8h
    this.expired_refresh_token =
      Number(process.env.EXPIRED_RE_TOKEN) || 1000 * 60 * 60 * 24 * 7; // 7d
  }

  private async createToken(
    data: Pick<user, 'user_id' | 'role'>,
    token: 'access_token' | 'refresh_token',
  ) {
    if (token === 'access_token') {
      const access_token = await this.jwt.sign(data, {
        expiresIn: '8h',
      });
      return 'Bearer ' + access_token;
    }
    const refresh_token = await this.jwt.sign(data, {
      expiresIn: '7d',
      secret: process.env.PRIVATE_KEY_RE || 'chauvanloc',
    });
    return 'Bearer ' + refresh_token;
  }

  private async hashPassword(
    plainText: string,
    saltOrRound = 10,
  ): Promise<string> {
    try {
      return await bcrypt.hash(plainText, saltOrRound);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  private comparePassword(
    plainPassword: string,
    encodePassword: string,
  ): boolean {
    try {
      return bcrypt.compareSync(plainPassword, encodePassword);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async validateUser({ email, password }): Promise<string | user> {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (!user) {
      return 'Email does not exist!';
    }
    if (!this.comparePassword(password, user.password)) {
      return 'Password incorrect!';
    }
    return user;
  }

  async login(
    data: Pick<user, 'user_id' | 'role'>,
  ): Promise<ApiResponse<LoginResponse>> {
    const accessTokenKey = CreateCacheKey(data.user_id, 'access_token');
    const refreshTokenKey = CreateCacheKey(data.user_id, 'refresh_token');

    const isAccessTokenExist = await this.cache.get(accessTokenKey);

    if (isAccessTokenExist) {
      throw new HttpException(
        'You can not login two device at time!',
        HttpStatus.BAD_REQUEST,
      );
    }
    const access_token = await this.createToken(data, 'access_token');
    const refresh_token = await this.createToken(data, 'refresh_token');
    await this.cache.set(
      accessTokenKey,
      access_token,
      this.expired_access_token,
    );
    await this.cache.set(
      refreshTokenKey,
      refresh_token,
      this.expired_refresh_token,
    );
    return {
      message: 'Login successfull!',
      data: {
        access_token,
        refresh_token,
      },
    };
  }

  async createUser(
    data: Pick<user, 'email' | 'password' | 'full_name' | 'gender' | 'phone'>,
  ): Promise<ApiResponse<Omit<user, 'password'>>> {
    const user = await this.prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });
    if (user) {
      throw new HttpException('User exist!', HttpStatus.CONFLICT);
    }
    const hash_password = await this.hashPassword(data.password);
    const new_user = await this.prisma.user.create({
      data: {
        ...data,
        role: 'user',
        password: hash_password,
      },
    });
    return {
      message: 'Create user succesfull',
      data: omit(new_user, ['password']),
    };
  }

  async business(
    user_id: number,
    cccd: string,
  ): Promise<ApiResponse<Omit<user, 'password'>>> {
    const user = await this.prisma.user.findUnique({
      where: {
        user_id,
      },
    });
    if (!user) {
      throw new HttpException('User does not exist!', HttpStatus.BAD_REQUEST);
    }
    if (user.role === 'business') {
      throw new HttpException('User was a business!', HttpStatus.BAD_REQUEST);
    }
    const update_user = await this.prisma.user.update({
      where: {
        user_id,
      },
      data: {
        role: 'business',
        cccd,
      },
    });
    return {
      message: 'Update role of user to be business successfull',
      data: omit(update_user, ['password']),
    };
  }

  async changeProfile(
    user_id: number,
    data: Partial<Pick<user, 'full_name' | 'birthday' | 'phone' | 'gender'>>,
  ): Promise<ApiResponse<Omit<user, 'password'>>> {
    const user = await this.prisma.user.findUnique({
      where: {
        user_id,
      },
    });
    if (!user) {
      throw new HttpException('User does not exist!', HttpStatus.BAD_REQUEST);
    }
    const new_profile = await this.prisma.user.update({
      where: {
        user_id,
      },
      data,
    });
    return {
      message: 'Update user successfull!',
      data: omit(new_profile, ['password']),
    };
  }

  async changePassword(
    user_id: number,
    current_password: string,
    new_password: string,
  ): Promise<ApiResponse<Omit<user, 'password'>>> {
    const user = await this.prisma.user.findUnique({
      where: {
        user_id,
      },
    });
    if (!user) {
      throw new HttpException('User does not exist!', HttpStatus.BAD_REQUEST);
    }
    if (!this.comparePassword(current_password, user.password)) {
      throw new HttpException(
        'Current password incorrect!',
        HttpStatus.BAD_REQUEST,
      );
    }
    const password = await this.hashPassword(new_password);
    const update_user = await this.prisma.user.update({
      where: {
        user_id,
      },
      data: {
        password,
      },
    });
    return {
      message: 'Update password successfull!',
      data: omit(update_user, ['password']),
    };
  }

  async logout(user_id: number): Promise<ApiResponse<{}>> {
    const access_token = await this.cache.get(
      CreateCacheKey(user_id, 'access_token'),
    );
    const refresh_token = await this.cache.get(
      CreateCacheKey(user_id, 'refresh_token'),
    );
    if (access_token) {
      await this.cache.del(CreateCacheKey(user_id, 'access_token'));
    }
    if (refresh_token) {
      await this.cache.del(CreateCacheKey(user_id, 'refresh_token'));
    }
    return {
      message: 'Logout successfull!',
      data: {},
    };
  }

  async reset(refresh_token: string): Promise<ApiResponse<LoginResponse>> {
    const payload: Pick<user, 'user_id' | 'role'> = await this.jwt.verify(
      refresh_token,
      {
        secret: process.env.PRIVATE_KEY_RE,
      },
    );
    if (!payload) {
      throw new HttpException('Refresh token invalid!', HttpStatus.BAD_REQUEST);
    }
    const refreshTokenFromCache = await this.cache.get(
      CreateCacheKey(payload.user_id, 'refresh_token'),
    );
    if (!refreshTokenFromCache || refreshTokenFromCache !== refresh_token) {
      throw new HttpException('Refresh token invalid!', HttpStatus.BAD_REQUEST);
    }
    await this.cache.del(CreateCacheKey(payload.user_id, 'refresh_token'));

    const access_token_from_cache = await this.cache.get(
      CreateCacheKey(payload.user_id, 'access_token'),
    );
    if (access_token_from_cache) {
      this.cache.del(CreateCacheKey(payload.user_id, 'access_token'));
    }

    const new_access_token = await this.createToken(payload, 'access_token');
    const new_refresh_token = await this.createToken(payload, 'refresh_token');

    await this.cache.set(
      CreateCacheKey(payload.user_id, 'access_token'),
      new_access_token,
    );
    await this.cache.set(
      CreateCacheKey(payload.user_id, 'refresh_token'),
      new_refresh_token,
    );

    return {
      message: 'Reset token successfull!',
      data: {
        access_token: new_access_token,
        refresh_token: new_refresh_token,
      },
    };
  }
}
