import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches, MaxLength } from 'class-validator';

export class LoginDTO {
  @ApiProperty({ default: 'admin@gmail.com' })
  @MaxLength(100)
  @IsEmail({}, { message: 'Email Incorrect!' })
  email: string;

  @ApiProperty({
    default: 'admin11@',
    description:
      'Minimum 8 character, at least 1 letter, 1 number and 1 special character',
  })
  @MaxLength(100)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
    message:
      'Minimum 8 character, at least 1 letter, 1 number and 1 special character',
  })
  password: string;
}
