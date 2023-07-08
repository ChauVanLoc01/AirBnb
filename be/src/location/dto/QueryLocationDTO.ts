import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class QueryLocationDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  location_name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  city: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  country: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsPositive()
  page: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsPositive()
  limit: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(['asc', 'desc'])
  order_by_city: 'asc' | 'desc';

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(['asc', 'desc'])
  order_by_country: 'asc' | 'desc';
}
