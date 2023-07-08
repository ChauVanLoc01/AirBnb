import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ConflicPrice } from 'src/decorators/ConflicPrice';

export class RealEstateQueryDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(200, { message: 'Max lenght is 200!' })
  name?: string;

  @ApiPropertyOptional({
    enum: [
      'rooms',
      'castles',
      'beachfront',
      'iconiccities',
      'desert',
      'omg',
      'adapted',
      'hanoks',
      'amazingpools',
      'lakefront',
      'amazingviews',
    ],
  })
  @IsOptional()
  @IsEnum(
    [
      'rooms',
      'castles',
      'beachfront',
      'iconiccities',
      'desert',
      'omg',
      'adapted',
      'hanoks',
      'amazingpools',
      'lakefront',
      'amazingviews',
    ],
    {
      message: 'Type is invalid!',
    },
  )
  type?:
    | 'rooms'
    | 'castles'
    | 'beachfront'
    | 'iconiccities'
    | 'desert'
    | 'omg'
    | 'adapted'
    | 'hanoks'
    | 'amazingpools'
    | 'lakefront'
    | 'amazingviews';

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsPositive()
  location_id?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsPositive()
  capacity?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsPositive()
  room_amount?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsPositive()
  bed_amount?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsPositive()
  bathroom_amount?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsPositive()
  price_min?: number;

  @ConflicPrice('price_min')
  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsPositive()
  price_max?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') {
      return true;
    }
    return false;
  })
  washingmachine?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') {
      return true;
    }
    return false;
  })
  iron?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') {
      return true;
    }
    return false;
  })
  television?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') {
      return true;
    }
    return false;
  })
  airconditioner?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') {
      return true;
    }
    return false;
  })
  wifi?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') {
      return true;
    }
    return false;
  })
  kitchen?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') {
      return true;
    }
    return false;
  })
  parkinglot?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') {
      return true;
    }
    return false;
  })
  pool?: boolean;

  @ApiPropertyOptional({ default: 1 })
  @Transform(({ value }) => Number(value))
  @IsPositive()
  @IsOptional()
  page?: number;

  @ApiPropertyOptional({ default: 10 })
  @Transform(({ value }) => Number(value))
  @IsPositive()
  @IsOptional()
  limit?: number;

  @ApiPropertyOptional({
    default: 'asc',
    enum: ['asc', 'desc'],
    description: 'Sort by price',
  })
  @IsEnum(['asc', 'desc'])
  @IsOptional()
  order_by?: 'asc' | 'desc';
}
