import { IsString, IsNumber, Min, IsOptional } from 'class-validator';

export class UpdateSessionDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  coach?: string;

  @IsString()
  @IsOptional()
  date?: string;

  @IsNumber()
  @IsOptional()
  duration?: number;

  @IsNumber()
  @Min(1, { message: 'El precio debe ser un número positivo' })
  @IsOptional()
  price?: number;
}
