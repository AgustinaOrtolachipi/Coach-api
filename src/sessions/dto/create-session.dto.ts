import { IsString, IsNumber, Min } from 'class-validator';

export class CreateSessionDto {
  @IsString()
  readonly title!: string;

  @IsString()
  readonly description!: string;

  @IsNumber()
  @Min(1)
  readonly duration!: number;

  @IsNumber()
  @Min(0)
  readonly price!: number;
}
