import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ResetTokenDTO {
  @ApiProperty({ name: 'refresh_token', required: true })
  @IsString()
  refresh_token: string;
}
