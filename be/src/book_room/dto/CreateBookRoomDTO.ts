import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsISO8601, IsPositive } from 'class-validator';

export class CreateBookRoom {
  @ApiProperty()
  @Transform(({ value }) => Number(value))
  @IsPositive()
  re_id: number;

  @ApiProperty()
  @IsISO8601()
  book_date: Date;

  @ApiProperty()
  @IsISO8601()
  checkout_date: Date;

  @ApiProperty()
  @Transform(({ value }) => Number(value))
  @IsPositive()
  amount_people: number;
}
