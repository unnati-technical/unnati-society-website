import { IsString, IsEmail, IsOptional, IsArray, IsUrl, IsDateString } from 'class-validator';

export class CreatePartnerDto {
  @IsOptional()
  @IsString()
  logo?: string;

  @IsString()
  organization: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsString()
  contactPerson: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  focusArea?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsDateString()
  since?: string;

  @IsOptional()
  @IsUrl()
  website?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  about?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  highlights?: string[];
}
