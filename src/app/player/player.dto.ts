import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';
import { Trim } from 'class-sanitizer';

export class playerDto {
  @IsString()
  @Length(1, 10)
  @ApiProperty()
  league_ID: number;
}
