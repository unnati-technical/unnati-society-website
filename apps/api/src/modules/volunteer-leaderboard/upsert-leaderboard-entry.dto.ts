import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpsertLeaderboardEntryDto {
  @IsString()
  @IsNotEmpty()
  month: string;

  @IsString()
  @IsNotEmpty()
  rank: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  role: string;

  @IsString()
  @IsNotEmpty()
  workshops: string;

  @IsString()
  @IsNotEmpty()
  hours: string;

  @IsOptional()
  @IsString()
  linkedin?: string;

  @IsOptional()
  @IsString()
  instagram?: string;
}
