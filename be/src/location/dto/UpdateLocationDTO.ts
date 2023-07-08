import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateLocationDTO {
  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  image: any;

  @ApiProperty()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  location_id: number;

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
}
