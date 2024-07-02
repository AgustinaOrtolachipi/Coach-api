import { IsString, IsNumber } from 'class-validator';

export class CreateSessionDto {
  @IsString()
  title: string;

  @IsString()
  coach: string;

  @IsString()
  date: string;

  @IsNumber()
  duration: number;

  @IsNumber()
  price: number;
}
