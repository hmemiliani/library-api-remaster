import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Author } from '../../authors/entities/author.entity';
import { Genre } from '../../genres/entities/genre.entity';

@Entity()
export class Book {
  @ApiProperty({ description: 'The unique identifier of the book' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'The title of the book' })
  @Column()
  title: string;

  @ApiProperty({ description: 'The authorId of the book' })
  @ManyToOne(() => Author, (author) => author.books)
  author: Author;

  @ApiProperty({
    description: 'The publication date of the book',
    example: '2024-10-06',
  })
  @Column()
  publicationDate: string;

  @ApiProperty({ description: 'The genreId of the book' })
  @ManyToOne(() => Genre, (genre) => genre.books)
  genre: Genre;

  @ApiProperty({
    description: 'Indicates if the book is logically deleted',
    default: false,
  })
  @Column({ default: false })
  isDeleted: boolean;
}
