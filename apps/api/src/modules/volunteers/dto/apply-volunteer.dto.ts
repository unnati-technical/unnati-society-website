import { IsString, IsEmail, IsOptional, IsArray } from 'class-validator';

export class ApplyVolunteerDto {
  @IsEmail()
  email: string;

  @IsString()
  fullName: string;

  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsString()
  age?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  college?: string;

  @IsOptional()
  @IsString()
  currentYear?: string;

  @IsOptional()
  @IsString()
  department?: string;

  @IsOptional()
  @IsString()
  linkedin?: string;

  @IsOptional()
  @IsString()
  portfolio?: string;

  @IsOptional()
  @IsString()
  resume?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  interests?: string[];

  @IsOptional()
  @IsString()
  availability?: string;

  @IsOptional()
  @IsString()
  mode?: string;

  @IsOptional()
  @IsString()
  hoursPerWeek?: string;

  @IsOptional()
  @IsString()
  whyJoin?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  skills?: string[];

  @IsOptional()
  @IsString()
  ngoName?: string;

  @IsOptional()
  @IsString()
  hasNgoExperience?: string;

  @IsOptional()
  @IsString()
  experienceDesc?: string;

  @IsOptional()
  @IsString()
  emergencyName?: string;

  @IsOptional()
  @IsString()
  emergencyPhone?: string;

  @IsOptional()
  @IsString()
  careerGoals?: string;

  @IsOptional()
  @IsString()
  startDate?: string;

  @IsOptional()
  @IsString()
  hearAboutUs?: string;
}
