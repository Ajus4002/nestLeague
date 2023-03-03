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

export class RegisterDto {
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
  @Length(6)
  @ApiPropertyOptional()
  password: string;

  @IsString()
  @ApiPropertyOptional()
  phone: string;

  @IsDate()
  @ApiPropertyOptional()
  dateOfBirth: Date;

  @IsInt()
  @ApiPropertyOptional()
  height: number;

  @IsString()
  @ApiPropertyOptional()
  address: string;

  @IsString()
  @ApiPropertyOptional()
  school: string;

  @IsString()
  @ApiPropertyOptional()
  @IsEnum(Role)
  role: Role;

  @IsString()
  @ApiPropertyOptional()
  club: string;
}

export class LoginDto {
  @IsEmail()
  @ApiProperty()
  @Trim()
  username: string;

  @IsString()
  @Length(6)
  @ApiPropertyOptional()
  password: string;
}

export class ForgetDto {
  @IsEmail()
  @ApiProperty()
  @Trim()
  email: string;
}

export class VerifyDto {
  @ApiProperty()
  @Trim()
  code: string;
}

export class ResetDto {
  @ApiProperty()
  @Trim()
  token: string;

  @IsString()
  @Length(6)
  @ApiPropertyOptional()
  password: string;
}
