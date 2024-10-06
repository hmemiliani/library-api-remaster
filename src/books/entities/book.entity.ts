import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Book {
  @ApiProperty({ description: 'The unique identifier of the book' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'The title of the book' })
  @Column()
  title: string;

  @ApiProperty({ description: 'The author of the book' })
  @Column()
  author: string;

  @ApiProperty({
    description: 'The publication date of the book',
    example: '2024-10-06',
  })
  @Column()
  publicationDate: string;

  @ApiProperty({ description: 'The genre of the book' })
  @Column()
  genre: string;

  @ApiProperty({
    description: 'Indicates if the book is logically deleted',
    default: false,
  })
  @Column({ default: false })
  isDeleted: boolean;
}
