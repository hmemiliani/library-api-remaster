import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../books/entities/book.entity';
import { Author } from '../authors/entities/author.entity';
import { Genre } from '../genres/entities/genre.entity';

@Injectable()
export class BooksSeeder {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
  ) {}

  async seed() {
    const books = [
      {
        title: "Harry Potter and the Philosopher's Stone",
        publicationDate: '1997-06-26',
        authorName: 'J.K. Rowling',
        genreName: 'Fantasy',
      },
      {
        title: 'A Game of Thrones',
        publicationDate: '1996-08-06',
        authorName: 'George R.R. Martin',
        genreName: 'Fantasy',
      },
      {
        title: 'The Hobbit',
        publicationDate: '1937-09-21',
        authorName: 'J.R.R. Tolkien',
        genreName: 'Adventure',
      },
    ];

    for (const book of books) {
      const author = await this.authorRepository.findOne({
        where: { name: book.authorName },
      });
      const genre = await this.genreRepository.findOne({
        where: { name: book.genreName },
      });

      if (author && genre) {
        const existingBook = await this.bookRepository.findOne({
          where: { title: book.title },
        });
        if (!existingBook) {
          await this.bookRepository.save(
            this.bookRepository.create({
              title: book.title,
              publicationDate: book.publicationDate,
              author,
              genre,
            }),
          );
        }
      }
    }

    console.log('Books seeded successfully');
  }
}
