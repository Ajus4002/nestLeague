import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';
import { Trim } from 'class-sanitizer';

export enum Role {
  Admin = 'Admin',
  Player = 'Player',
  SuperAdmin = 'SuperAdmin',
}

export class adminDto {
  @IsString()
  @Length(1, 10)
  @ApiProperty()
  firstName: string;

  @IsString()
  @ApiProperty()
  lastName: string;

  @IsEmail()
  @ApiProperty()
  @Trim()
  email: string;
  @IsString()
  @Length(1, 10)
  @ApiProperty()
  address: string;

  @IsString()
  @Length(6)
  @ApiPropertyOptional()
  password: string;
}
