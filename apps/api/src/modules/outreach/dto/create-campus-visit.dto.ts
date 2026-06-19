import { IsString, IsEmail, IsArray, IsOptional } from 'class-validator';

export class CreateCampusVisitDto {
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

  @IsOptional()
  @IsString()
  studentsCount?: string;

  @IsOptional()
  @IsString()
  teachersCount?: string;

  @IsArray()
  @IsOptional()
  classes?: string[];

  @IsArray()
  @IsOptional()
  purposes?: string[];

  @IsArray()
  @IsOptional()
  activities?: string[];

  @IsOptional()
  @IsString()
  prefDate?: string;

  @IsOptional()
  @IsString()
  altDate?: string;

  @IsOptional()
  @IsString()
  prefTime?: string;

  @IsString()
  coordinatorName: string;

  @IsOptional()
  @IsString()
  designation?: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  whatsapp?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
