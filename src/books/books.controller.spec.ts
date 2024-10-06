import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';

describe('BooksController', () => {
  let controller: BooksController;
  let service: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        {
          provide: BooksService,
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Book),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<BooksController>(BooksController);
    service = module.get<BooksService>(BooksService);
  });

  it('should throw an error if createBookDto is invalid', async () => {
    const createBookDto: CreateBookDto = {
      title: '',
      author: '',
      publicationDate: 'invalid-date',
      genre: '',
    };

    try {
      await controller.create(createBookDto);
    } catch (error) {
      expect(error).toHaveProperty('response');
      expect(error.response).toHaveProperty('message');
      expect(error.response.message).toContain('title should not be empty');
      expect(error.response.message).toContain(
        'publicationDate must be a valid ISO 8601 date string',
      );
    }
  });

  it('should call BooksService.findOne with correct id', async () => {
    const bookId = 1;
    const result = {
      id: bookId,
      title: 'Test Book',
      author: 'Author',
      publicationDate: '2024-10-06',
      genre: 'Fiction',
      isDeleted: false,
    };

    jest.spyOn(service, 'findOne').mockResolvedValue(result);

    expect(await controller.findOne(bookId)).toEqual(result);
    expect(service.findOne).toHaveBeenCalledWith(bookId);
  });
});
