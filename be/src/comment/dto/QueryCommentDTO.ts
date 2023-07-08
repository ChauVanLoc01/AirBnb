import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsISO8601, IsOptional, IsPositive } from 'class-validator';

export class QueryCommentDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsISO8601()
  created: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsISO8601()
  updated: Date;

  @ApiPropertyOptional({ default: 1 })
  @Transform(({ value }) => value && Number(value))
  @IsOptional()
  @IsPositive()
  page: number;

  @ApiPropertyOptional({ default: 5 })
  @Transform(({ value }) => value && Number(value))
  @IsOptional()
  @IsPositive()
  limit: number;

  @ApiPropertyOptional({ default: 'asc' })
  @IsEnum(['asc', 'desc'])
  @IsOptional()
  order_by: 'asc' | 'desc';
}
