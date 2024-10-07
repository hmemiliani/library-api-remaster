import { Injectable } from '@nestjs/common';
import { AuthorsSeeder } from './authors.seeder';
import { GenresSeeder } from './genres.seeder';
import { BooksSeeder } from './books.seeder';

@Injectable()
export class Seeder {
  constructor(
    private readonly authorsSeeder: AuthorsSeeder,
    private readonly genresSeeder: GenresSeeder,
    private readonly booksSeeder: BooksSeeder,
  ) {}

  async seed() {
    await this.authorsSeeder.seed();
    await this.genresSeeder.seed();
    await this.booksSeeder.seed();
    console.log('Seeding completed');
  }
}
