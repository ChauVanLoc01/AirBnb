import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateRealEstateDTO {
  @ApiProperty({
    type: 'array',
    items: {
      type: 'string',
      format: 'binary',
    },
    description: 'Maximum 5 images/*',
  })
  image: Express.Multer.File[];

  @ApiProperty()
  @IsString()
  @MaxLength(200, { message: 'Max lenght is 200!' })
  name: string;

  @ApiProperty({
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
    | 'amazingviews';

  @ApiProperty()
  @IsPositive()
  @Transform(({ value }) => Number(value))
  location_id: number;

  @ApiProperty()
  @IsPositive()
  @Transform(({ value }) => Number(value))
  capacity: number;

  @ApiProperty()
  @IsPositive()
  @Transform(({ value }) => Number(value))
  room_amount: number;

  @ApiProperty()
  @IsPositive()
  @Transform(({ value }) => Number(value))
  bed_amount: number;

  @ApiProperty()
  @IsPositive()
  @Transform(({ value }) => Number(value))
  bathroom_amount: number;

  @ApiProperty()
  @IsString()
  @MaxLength(2000, { message: 'Lenght of description is 2000 character!' })
  description: string;

  @ApiProperty()
  @IsPositive()
  @Transform(({ value }) => Number(value))
  price: number;

  @ApiProperty({ default: false })
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') {
      return true;
    } else if (value === 'false') {
      return false;
    }
  })
  washingmachine: boolean;

  @ApiProperty({ default: false })
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') {
      return true;
    } else if (value === 'false') {
      return false;
    }
  })
  iron: boolean;

  @ApiProperty({ default: false })
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') {
      return true;
    } else if (value === 'false') {
      return false;
    }
  })
  television: boolean;

  @ApiProperty({ default: false })
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') {
      return true;
    } else if (value === 'false') {
      return false;
    }
  })
  airconditioner: boolean;

  @ApiProperty({ default: false })
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') {
      return true;
    } else if (value === 'false') {
      return false;
    }
  })
  wifi: boolean;

  @ApiProperty({ default: false })
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') {
      return true;
    } else if (value === 'false') {
      return false;
    }
  })
  kitchen: boolean;

  @ApiProperty({ default: false })
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') {
      return true;
    } else if (value === 'false') {
      return false;
    }
  })
  parkinglot: boolean;

  @ApiProperty({ default: false })
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') {
      return true;
    } else if (value === 'false') {
      return false;
    }
  })
  pool: boolean;
}
