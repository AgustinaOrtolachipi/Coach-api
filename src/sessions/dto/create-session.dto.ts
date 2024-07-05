import { IsString, IsNumber, Min } from 'class-validator';

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
  @Min(1, { message: 'El precio debe ser un número positivo' })
  price: number;
}
