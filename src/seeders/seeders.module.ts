import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorsSeeder } from './authors.seeder';
import { GenresSeeder } from './genres.seeder';
import { BooksSeeder } from './books.seeder';
import { Seeder } from './index';
import { Author } from '../authors/entities/author.entity';
import { Genre } from '../genres/entities/genre.entity';
import { Book } from '../books/entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Author, Genre, Book])],
  providers: [AuthorsSeeder, GenresSeeder, BooksSeeder, Seeder],
  exports: [Seeder],
})
export class SeedersModule {}
