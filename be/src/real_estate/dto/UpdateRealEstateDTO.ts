import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateRealEstateDTO {
  @ApiPropertyOptional({
    type: 'array',
    items: {
      type: 'string',
      format: 'binary',
    },
    description: 'Maximum 5 images/*',
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (value === '') {
      return undefined;
    }
    return value;
  })
  image: any[] | undefined;

  @ApiProperty()
  @IsPositive()
  @Transform(({ value }) => Number(value))
  re_id: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(200, { message: 'Max lenght is 200!' })
  @Transform(({ value }) => {
    if (value === '') {
      return undefined;
    }
    return value;
  })
  name: string | undefined;

  @ApiPropertyOptional({
    isArray: true,
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
  @Transform(({ value }) => {
    if (value === '') {
      return undefined;
    }
    return value;
  })
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
  @IsOptional()
  type:
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
    | 'amazingviews'
    | undefined;

  @ApiPropertyOptional()
  @IsOptional()
  @IsPositive()
  @Transform(({ value }) => {
    if (value === '') {
      return undefined;
    }
    return Number(value);
  })
  location_id: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsPositive()
  @Transform(({ value }) => {
    if (value === '') {
      return undefined;
    }
    return Number(value);
  })
  capacity: number | undefined;

  @ApiPropertyOptional()
  @IsOptional()
  @IsPositive()
  @Transform(({ value }) => {
    if (value === '') {
      return undefined;
    }
    return Number(value);
  })
  room_amount: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsPositive()
  @Transform(({ value }) => {
    if (value === '') {
      return undefined;
    }
    return Number(value);
  })
  bed_amount: number | undefined;

  @ApiPropertyOptional()
  @IsOptional()
  @IsPositive()
  @Transform(({ value }) => {
    if (value === '') {
      return undefined;
    }
    return Number(value);
  })
  bathroom_amount: number | undefined;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @MaxLength(2000, { message: 'Lenght of description is 2000 character!' })
  @Transform(({ value }) => {
    if (value === '') {
      return undefined;
    }
    return value;
  })
  description: string | undefined;

  @ApiPropertyOptional()
  @IsOptional()
  @IsPositive()
  @Transform(({ value }) => {
    if (value === '') {
      return undefined;
    }
    return Number(value);
  })
  price: number | undefined;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') {
      return true;
    } else if (value === 'false') {
      return false;
    }
    return undefined;
  })
  washingmachine: boolean | undefined;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') {
      return true;
    } else if (value === 'false') {
      return false;
    }
    return undefined;
  })
  iron: boolean | undefined;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') {
      return true;
    } else if (value === 'false') {
      return false;
    }
    return undefined;
  })
  television: boolean | undefined;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') {
      return true;
    } else if (value === 'false') {
      return false;
    }
    return undefined;
  })
  airconditioner: boolean | undefined;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') {
      return true;
    } else if (value === 'false') {
      return false;
    }
    return undefined;
  })
  wifi: boolean | undefined;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') {
      return true;
    } else if (value === 'false') {
      return false;
    }
    return undefined;
  })
  kitchen: boolean | undefined;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') {
      return true;
    } else if (value === 'false') {
      return false;
    }
    return undefined;
  })
  parkinglot: boolean | undefined;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') {
      return true;
    } else if (value === 'false') {
      return false;
    }
    return undefined;
  })
  pool: boolean | undefined;
}
