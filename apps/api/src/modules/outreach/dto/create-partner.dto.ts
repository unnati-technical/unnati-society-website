import { IsString, IsEmail, IsOptional, IsArray } from 'class-validator';

export class CreatePartnerDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  organization?: string;

  @IsOptional()
  @IsString()
  website?: string;

  @IsOptional()
  @IsString()
  linkedin?: string;

  @IsString()
  organizationType: string;

  @IsString()
  partnershipInterest: string;

  @IsOptional()
  @IsString()
  collaborationMode?: string;

  @IsOptional()
  areasOfInterest?: any;

  @IsOptional()
  @IsString()
  message?: string;

  @IsOptional()
  @IsString()
  meetingMode?: string;

  @IsOptional()
  meetingDate?: Date | string;

  @IsOptional()
  @IsString()
  documentUrl?: string;
}
