import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsDateString } from 'class-validator';

export class UpdateBookDto {
  @ApiProperty({ description: 'The title of the book', required: false }) // `required: false` porque es opcional
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ description: 'The author of the book', required: false })
  @IsString()
  @IsOptional()
  author?: string;

  @ApiProperty({
    description: 'The publication date of the book',
    required: false,
    example: '2024-10-06',
  })
  @IsDateString()
  @IsOptional()
  publicationDate?: string;

  @ApiProperty({ description: 'The genre of the book', required: false })
  @IsString()
  @IsOptional()
  genre?: string;
}
