import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsDateString, IsNumber } from 'class-validator';

export class UpdateBookDto {
  @ApiProperty({ description: 'The title of the book', required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ description: 'The ID of the author', required: false })
  @IsNumber()
  @IsOptional()
  authorId?: number;

  @ApiProperty({
    description: 'The publication date of the book',
    required: false,
    example: '2024-10-06',
  })
  @IsDateString()
  @IsOptional()
  publicationDate?: string;

  @ApiProperty({ description: 'The ID of the genre', required: false })
  @IsNumber()
  @IsOptional()
  genreId?: number;
}
