import { IsOptional, IsInt, Min, IsString, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 20;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  sort?: string = 'desc';

  @IsOptional()
  @IsString()
  @IsIn(['createdAt', 'updatedAt', 'title', 'name', 'date', 'status']) // Adjust dynamically or extend in specific DTOs
  sortBy?: string = 'createdAt';
}
