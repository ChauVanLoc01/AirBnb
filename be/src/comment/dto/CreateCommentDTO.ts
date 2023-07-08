import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateCommentDTO {
  @ApiProperty()
  @Transform(({ value }) => Number(value))
  @IsPositive()
  re_id: number;

  @ApiProperty()
  @IsString()
  content: string;
}
