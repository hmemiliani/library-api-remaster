// src/books/books.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { NotFoundException } from '@nestjs/common';
import { UpdateBookDto } from './dto/update-book.dto';

describe('BooksService', () => {
  let service: BooksService;
  let repository: Repository<Book>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getRepositoryToken(Book),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    repository = module.get<Repository<Book>>(getRepositoryToken(Book));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new book', async () => {
    const createBookDto: CreateBookDto = {
      title: 'Sample Book',
      author: 'Sample Author',
      publicationDate: '2024-10-06',
      genre: 'Sample Genre',
    };

    const bookEntity = { id: 1, ...createBookDto };

    jest.spyOn(repository, 'create').mockReturnValue(bookEntity as Book);
    jest.spyOn(repository, 'save').mockResolvedValue(bookEntity as Book);

    const result = await service.create(createBookDto);
    expect(result).toEqual(bookEntity);
    expect(repository.create).toHaveBeenCalledWith(createBookDto);
    expect(repository.save).toHaveBeenCalledWith(bookEntity);
  });

  it('should return an array of books', async () => {
    const booksArray = [
      {
        id: 1,
        title: 'This is a book',
        author: 'This is an author',
        publicationDate: '2024-10-06',
        genre: 'This is a genre',
      },
    ];

    jest.spyOn(repository, 'find').mockResolvedValue(booksArray as Book[]);

    const result = await service.findAll();
    expect(result).toEqual(booksArray);
    expect(repository.find).toHaveBeenCalled();
  });

  it('should return a single book', async () => {
    const bookEntity = {
      id: 1,
      title: 'This is a book',
      author: 'This is an author',
      publicationDate: '2024-10-06',
      genre: 'This is a genre',
    };

    jest.spyOn(repository, 'findOne').mockResolvedValue(bookEntity as Book);

    const result = await service.findOne(1);
    expect(result).toEqual(bookEntity);
    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('should throw a NotFoundException if book is not found', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(null);

    try {
      await service.findOne(1);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe('Book with ID 1 not found');
    }
    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('should update a book', async () => {
    const updateBookDto: UpdateBookDto = {
      title: 'Updated Title',
    };

    const bookEntity = {
      id: 1,
      title: 'Original Title',
      author: 'Sample Author',
      publicationDate: '2024-10-06',
      genre: 'Sample Genre',
    };

    jest.spyOn(repository, 'findOne').mockResolvedValue(bookEntity as Book);
    jest
      .spyOn(repository, 'save')
      .mockResolvedValue({ ...bookEntity, ...updateBookDto } as Book);

    const result = await service.update(1, updateBookDto);
    expect(result).toEqual({ ...bookEntity, ...updateBookDto });
    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(repository.save).toHaveBeenCalledWith({
      ...bookEntity,
      ...UpdateBookDto,
    });
  });

  it('should throw a NotFoundException if book to update is not found', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(null);

    try {
      await service.update(1, {});
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe('Book with ID 1 not found');
    }
    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('should logically remove a book', async () => {
    const bookEntity = {
      id: 1,
      title: 'Sample Book',
      author: 'Sample Author',
      publicationDate: '2024-10-06',
      genre: 'Sample Genre',
      isDeleted: false,
    };

    jest.spyOn(repository, 'findOne').mockResolvedValue(bookEntity as Book);
    jest
      .spyOn(repository, 'save')
      .mockResolvedValue({ ...bookEntity, isDeleted: true } as Book);

    const result = await service.remove(1);
    expect(result.isDeleted).toBe(true);
    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(repository.save).toHaveBeenCalledWith({
      ...bookEntity,
      isDeleted: true,
    });
  });

  it('should throw a NotFoundException if book to remove is not found', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(null);

    try {
      await service.remove(1);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe('Book with ID 1 not found');
    }
    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  });
});
