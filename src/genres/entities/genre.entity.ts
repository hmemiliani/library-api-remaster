import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Book } from '../../books/entities/book.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Genre {
  @ApiProperty({ description: 'The unique identifier of the genre' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'The name of the genre' })
  @Column()
  name: string;

  @ApiProperty({
    description: 'The list of books in this genre',
    type: () => [Book],
  })
  @OneToMany(() => Book, (book) => book.genre)
  books: Book[];
}
