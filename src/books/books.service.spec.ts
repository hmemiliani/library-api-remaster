// src/books/books.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { NotFoundException } from '@nestjs/common';
import { UpdateBookDto } from './dto/update-book.dto';
import { Author } from '../authors/entities/author.entity';
import { Genre } from '../genres/entities/genre.entity';

describe('BooksService', () => {
  let service: BooksService;
  let repository: Repository<Book>;
  let authorRepository: Repository<Author>;
  let genreRepository: Repository<Genre>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getRepositoryToken(Book),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Author),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Genre),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    repository = module.get<Repository<Book>>(getRepositoryToken(Book));
    authorRepository = module.get<Repository<Author>>(
      getRepositoryToken(Author),
    );
    genreRepository = module.get<Repository<Genre>>(getRepositoryToken(Genre));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new book', async () => {
    const createBookDto: CreateBookDto = {
      title: 'Sample Book',
      authorId: 4,
      publicationDate: '2024-04-06',
      genreId: 4,
    };

    const authorEntity = {
      id: 4,
      name: 'Sample Author',
    };

    const genreEntity = {
      id: 4,
      name: 'Sample Genre',
    };

    const bookEntity = {
      id: 4,
      title: createBookDto.title,
      publicationDate: createBookDto.publicationDate,
      author: authorEntity,
      genre: genreEntity,
      isDeleted: false,
    };

    jest
      .spyOn(authorRepository, 'findOne')
      .mockResolvedValue(authorEntity as Author);
    jest
      .spyOn(genreRepository, 'findOne')
      .mockResolvedValue(genreEntity as Genre);
    jest.spyOn(repository, 'create').mockReturnValue(bookEntity as Book);
    jest.spyOn(repository, 'save').mockResolvedValue(bookEntity as Book);

    const result = await service.create(createBookDto);

    expect(result).toEqual(bookEntity);
    expect(authorRepository.findOne).toHaveBeenCalledWith({
      where: { id: createBookDto.authorId },
    });
    expect(genreRepository.findOne).toHaveBeenCalledWith({
      where: { id: createBookDto.genreId },
    });
    expect(repository.create).toHaveBeenCalledWith({
      title: createBookDto.title,
      publicationDate: createBookDto.publicationDate,
      author: authorEntity,
      genre: genreEntity,
    });
    expect(repository.save).toHaveBeenCalledWith(bookEntity);
  });

  it('should return an array of books', async () => {
    const booksArray = [
      {
        id: 4,
        title: 'This is a book',
        publicationDate: '2024-04-06',
        isDeleted: false,
        author: {
          id: 4,
          name: 'This is an author',
        },
        genre: {
          id: 4,
          name: 'This is a genre',
        },
      },
    ];

    jest.spyOn(repository, 'find').mockResolvedValue(booksArray as Book[]);

    const result = await service.findAll();
    expect(result).toEqual(booksArray);
    expect(repository.find).toHaveBeenCalled();
  });

  it('should return a single book', async () => {
    const bookEntity = {
      id: 4,
      title: 'This is a book',
      publicationDate: '2024-04-06',
      isDeleted: false,
      author: {
        id: 4,
        name: 'This is an author',
      },
      genre: {
        id: 4,
        name: 'This is a genre',
      },
    };

    jest.spyOn(repository, 'findOne').mockResolvedValue(bookEntity as Book);

    const result = await service.findOne(4);
    expect(result).toEqual(bookEntity);
    expect(repository.findOne).toHaveBeenCalledWith({
      where: { id: 4 },
      relations: ['author', 'genre'],
    });
  });

  it('should throw a NotFoundException if book is not found', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(null);

    try {
      await service.findOne(4);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe('Book with ID 4 not found');
    }
    expect(repository.findOne).toHaveBeenCalledWith({
      where: { id: 4 },
      relations: ['author', 'genre'],
    });
  });

  it('should update a book', async () => {
    const updateBookDto: UpdateBookDto = {
      title: 'Updated Title',
    };

    const bookEntity = {
      id: 4,
      title: 'Original Title',
      publicationDate: '2024-04-06',
      isDeleted: false,
      author: {
        id: 4,
        name: 'Sample Author',
      },
      genre: {
        id: 4,
        name: 'Sample Genre',
      },
    };

    jest.spyOn(repository, 'findOne').mockResolvedValue(bookEntity as Book);
    jest
      .spyOn(repository, 'save')
      .mockResolvedValue({ ...bookEntity, ...updateBookDto } as Book);

    const result = await service.update(4, updateBookDto);

    expect(result).toEqual({ ...bookEntity, ...updateBookDto });
    expect(repository.findOne).toHaveBeenCalledWith({
      where: { id: 4 },
    });

    expect(repository.save).toHaveBeenCalledWith({
      ...bookEntity,
      ...updateBookDto,
    });
  });

  it('should throw a NotFoundException if book to update is not found', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(null);

    try {
      await service.update(4, {});
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe('Book with ID 4 not found');
    }
    expect(repository.findOne).toHaveBeenCalledWith({
      where: { id: 4 },
    });
  });

  it('should logically remove a book', async () => {
    const bookEntity = {
      id: 4,
      title: 'Sample Book',
      publicationDate: '2024-04-06',
      isDeleted: false,
      author: {
        id: 4,
        name: 'Sample Author',
      },
      genre: {
        id: 4,
        name: 'Sample Genre',
      },
    };

    jest.spyOn(repository, 'findOne').mockResolvedValue(bookEntity as Book);
    jest
      .spyOn(repository, 'save')
      .mockResolvedValue({ ...bookEntity, isDeleted: true } as Book);

    const result = await service.remove(4);
    expect(result.isDeleted).toBe(true);
    expect(repository.findOne).toHaveBeenCalledWith({
      where: { id: 4 },
    });

    expect(repository.save).toHaveBeenCalledWith({
      ...bookEntity,
      isDeleted: true,
    });
  });

  it('should throw a NotFoundException if book to remove is not found', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(null);

    try {
      await service.remove(4);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe('Book with ID 4 not found');
    }
    expect(repository.findOne).toHaveBeenCalledWith({
      where: { id: 4 },
    });
  });

  it('should return an empty array if no books are found', async () => {
    jest.spyOn(repository, 'find').mockResolvedValue([]);

    const result = await service.findAll();
    expect(result).toEqual([]);
    expect(repository.find).toHaveBeenCalledWith({
      where: { isDeleted: false },
      relations: ['author', 'genre'],
    });
  });
});
