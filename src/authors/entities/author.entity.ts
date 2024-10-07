import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Book } from '../../books/entities/book.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Author {
  @ApiProperty({ description: 'The unique identifier of the author' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'The name of the author' })
  @Column()
  name: string;

  @ApiProperty({
    description: 'The list of books by the author',
    type: () => [Book],
  })
  @OneToMany(() => Book, (book) => book.author)
  books: Book[];
}
