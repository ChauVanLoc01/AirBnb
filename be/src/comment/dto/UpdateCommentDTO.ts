import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class UpdateCommentDTO {
  @ApiProperty()
  @IsPositive()
  @Transform(({ value }) => Number(value))
  cmt_id: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  content: string;
}
