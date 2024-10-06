import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

describe('BooksController', () => {
  let controller: BooksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        BooksService,
        {
          provide: APP_PIPE,
          useValue: new ValidationPipe(),
        },
      ],
    }).compile();

    controller = module.get<BooksController>(BooksController);
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
      expect(error.response).toHaveProperty('message');
      expect(error.response.message).toContain('title should not be empty');
      expect(error.response.message).toContain(
        'publicationDate must be a valid ISO 8601 date string',
      );
    }
  });
});
