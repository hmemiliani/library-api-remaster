import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { Book } from './entities/book.entity';
import { AuthorsModule } from '../authors/authors.module';
import { GenresModule } from '../genres/genres.module';

@Module({
  imports: [TypeOrmModule.forFeature([Book]), AuthorsModule, GenresModule],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
