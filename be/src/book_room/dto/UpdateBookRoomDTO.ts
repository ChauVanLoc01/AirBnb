import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsISO8601, IsOptional, IsPositive } from 'class-validator';

export class UpdateBookRoomDTO {
  @ApiProperty()
  @Transform(({ value }) => Number(value))
  @IsPositive()
  br_id: number;

  @ApiPropertyOptional()
  @IsISO8601()
  @IsOptional()
  book_date: Date;

  @ApiPropertyOptional()
  @IsISO8601()
  @IsOptional()
  checkout_date: Date;

  @ApiPropertyOptional()
  @Transform(({ value }) => Number(value))
  @IsPositive()
  @IsOptional()
  amount_people: number;
}
