import {
  IsString,
  IsEmail,
  IsOptional,
  IsArray,
  IsInt,
  IsUrl,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSchoolDto {
  @IsOptional()
  @IsString()
  logo?: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  district?: string;

  @IsString()
  address: string;

  @IsString()
  contactPerson: string;

  @IsEmail()
  contactEmail: string;

  @IsString()
  contactPhone: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  programs?: string[];

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  studentsCount?: number;

  @IsOptional()
  @IsString()
  schoolType?: string;

  @IsOptional()
  @IsString()
  schoolCategory?: string;

  @IsOptional()
  @IsString()
  affiliation?: string;

  @IsOptional()
  @IsString()
  establishedYear?: string;

  @IsOptional()
  @IsString()
  grades?: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  teachersCount?: number;

  @IsOptional()
  @IsUrl()
  website?: string;
}
