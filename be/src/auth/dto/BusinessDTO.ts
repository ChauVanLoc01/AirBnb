import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class BusinessDTO {
  @ApiProperty()
  @IsString()
  @MaxLength(15)
  cccd: string;
}
