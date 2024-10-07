import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Author } from 'src/authors/entities/author.entity';
import { Genre } from 'src/genres/entities/genre.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>, // Inyectar el repositorio de Author
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>, // Inyectar el repositorio de Genre
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const author = await this.authorRepository.findOne({
      where: { id: createBookDto.authorId },
    });
    const genre = await this.genreRepository.findOne({
      where: { id: createBookDto.genreId },
    });

    if (!author || !genre) {
      throw new NotFoundException('Author or Genre not found');
    }

    const newBook = this.bookRepository.create({
      title: createBookDto.title,
      publicationDate: createBookDto.publicationDate,
      author,
      genre,
    });

    return this.bookRepository.save(newBook);
  }

  async findAll(): Promise<Book[]> {
    return this.bookRepository.find({
      where: { isDeleted: false },
      relations: ['author', 'genre'],
    });
  }

  async findOne(id: number): Promise<Book> {
    const book = await this.bookRepository.findOne({
      where: { id },
      relations: ['author', 'genre'],
    });
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    const book = await this.bookRepository.findOne({ where: { id } });
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    Object.assign(book, updateBookDto);
    return this.bookRepository.save(book);
  }

  async remove(id: number): Promise<Book> {
    const book = await this.bookRepository.findOne({ where: { id } });
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    book.isDeleted = true;
    return this.bookRepository.save(book);
  }
}
