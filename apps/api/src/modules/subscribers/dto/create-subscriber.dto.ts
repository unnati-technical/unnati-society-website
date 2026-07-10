import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateSubscriberDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
