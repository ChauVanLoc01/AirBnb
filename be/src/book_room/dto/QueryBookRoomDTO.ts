import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsISO8601, IsOptional, IsPositive } from 'class-validator';

export class QueryBookRoomDTO {
  @ApiPropertyOptional()
  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsPositive()
  re_id: number;

  @ApiPropertyOptional()
  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsPositive()
  user_id: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsISO8601()
  book_date: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsISO8601()
  checkout_date: Date;

  @ApiPropertyOptional()
  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsPositive()
  amount_people: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsISO8601()
  created: Date;
}
