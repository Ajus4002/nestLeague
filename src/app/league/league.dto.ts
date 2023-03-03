import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Length,
  IsInt,
  IsDate,
  Min,
  Max,
  IsEnum,
} from 'class-validator';
import { Trim } from 'class-sanitizer';

export enum Role {
  Admin = 'Admin',
  Player = 'Player',
  SuperAdmin = 'SuperAdmin',
}

export class leagueDto {
  @IsString()
  @Length(1, 10)
  @ApiProperty()
  name: string;

  @IsDate()
  @ApiPropertyOptional()
  date: Date;

  @IsString()
  @ApiPropertyOptional()
  timing: string;

  @IsString()
  @ApiPropertyOptional()
  details: string;
}
