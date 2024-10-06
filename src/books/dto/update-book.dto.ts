import { IsString, IsOptional, IsDateString } from 'class-validator';

export class UpdateBookDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  author?: string;

  @IsDateString()
  @IsOptional()
  publicationDate?: string;

  @IsString()
  @IsOptional()
  genre?: string;
}
