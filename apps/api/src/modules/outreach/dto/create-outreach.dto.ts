import { IsString, IsEmail, IsArray, IsOptional } from 'class-validator';

export class CreateOutreachDto {
  @IsString()
  institutionName: string;

  @IsOptional()
  @IsString()
  institutionType?: string;

  @IsOptional()
  @IsString()
  board?: string;

  @IsOptional()
  @IsString()
  studentsCount?: string;

  @IsOptional()
  @IsString()
  website?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  district?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsArray()
  @IsOptional()
  programs?: string[];

  @IsArray()
  @IsOptional()
  targetAudience?: string[];

  @IsOptional()
  @IsString()
  expectedParticipants?: string;

  @IsOptional()
  @IsString()
  preferredMode?: string;

  @IsOptional()
  @IsString()
  prefDate?: string;

  @IsOptional()
  @IsString()
  altDate?: string;

  @IsOptional()
  @IsString()
  duration?: string;

  @IsString()
  coordinatorName: string;

  @IsOptional()
  @IsString()
  designation?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  whatsapp?: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  availability?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsString()
  specialReqs?: string;
}
