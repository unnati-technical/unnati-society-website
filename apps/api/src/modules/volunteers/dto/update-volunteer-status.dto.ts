import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateVolunteerStatusDto {
  @IsString()
  @IsNotEmpty()
  status: string;
}
