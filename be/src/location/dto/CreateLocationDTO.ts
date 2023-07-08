import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateLocationDTO {
  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  image: any;

  @ApiProperty()
  @IsString()
  @MaxLength(100, { message: 'Max lenght of location name is 100 character!' })
  location_name: string;

  @ApiProperty()
  @IsString()
  @MaxLength(100, { message: 'Max lenght of city is 100 character!' })
  city: string;

  @ApiProperty()
  @IsString()
  @MaxLength(100, { message: 'Max lenght of country is 100 character!' })
  country: string;
}
