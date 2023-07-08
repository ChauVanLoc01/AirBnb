import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

export class RegisterDTO {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(60, { message: 'Full name is required!' })
  full_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(['male', 'female', 'other'], {
    message: 'Gender must is male or female or other',
  })
  gender: 'male' | 'female' | 'other';

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(10, { message: 'Max lenght of number phone is 10 character!' })
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail({}, { message: 'Email Incorrect!' })
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
    message:
      'Minimum 8 character, at least 1 letter, 1 number and 1 special character',
  })
  password: string;
}
