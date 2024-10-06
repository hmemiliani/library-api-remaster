import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsDateString()
  @IsNotEmpty()
  publicationDate: string;

  @IsString()
  @IsNotEmpty()
  genre: string;
}
