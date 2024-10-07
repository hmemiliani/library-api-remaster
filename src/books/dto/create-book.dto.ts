import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDateString, IsNumber } from 'class-validator';

export class CreateBookDto {
  @ApiProperty({ description: 'The title of the book' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'The ID of the author' })
  @IsNumber()
  @IsNotEmpty()
  authorId: number;

  @ApiProperty({
    description: 'The publication date of the book',
    example: '2024-10-06',
  })
  @IsDateString()
  @IsNotEmpty()
  publicationDate: string;

  @ApiProperty({ description: 'The ID of the genre' })
  @IsNumber()
  @IsNotEmpty()
  genreId: number;
}
