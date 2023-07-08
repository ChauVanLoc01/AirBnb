import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { plainToClass } from 'class-transformer';
import { ErrorValidate } from 'src/types/ErrorValidate.type';
import { LoginDTO } from '../dto/LoginDTO';
import { ValidationError, validate } from 'class-validator';
import { ApiResponse } from 'src/types/ApiResponse.type';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string) {
    // validate user's input
    const login = plainToClass(LoginDTO, { email, password });
    const errors: ValidationError[] = await validate(login);
    if (errors.length > 0) {
      const data_err = errors.map((err) => {
        return { key: err.property, errors: err.constraints } as ErrorValidate;
      });
      throw new HttpException(
        {
          message: 'Input of user invalid!',
          data: data_err,
        } as ApiResponse<ErrorValidate[]>,
        HttpStatus.BAD_REQUEST,
      );
    }

    // validate user
    const user = await this.authService.validateUser({ email, password });
    if (typeof user === 'string') {
      throw new HttpException(user, HttpStatus.BAD_REQUEST);
    }
    return user;
  }
}
