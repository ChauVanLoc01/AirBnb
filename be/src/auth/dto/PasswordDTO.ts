import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
  Matches,
  MaxLength,
} from 'class-validator';
import { NotMatch } from 'src/decorators/NotMatch';

export class PasswordDTO {
  @ApiProperty()
  @IsNotEmpty()
  @NotMatch('new_password')
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
    message:
      'Minimum 8 character, at least 1 letter, 1 number and 1 special character',
  })
  current_password: string;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
    message:
      'Minimum 8 character, at least 1 letter, 1 number and 1 special character',
  })
  new_password: string;
}
