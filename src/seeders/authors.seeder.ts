import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from '../authors/entities/author.entity';

@Injectable()
export class AuthorsSeeder {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  async seed() {
    const authors = [
      { name: 'J.K. Rowling' },
      { name: 'George R.R. Martin' },
      { name: 'J.R.R. Tolkien' },
    ];

    for (const author of authors) {
      const existingAuthor = await this.authorRepository.findOne({
        where: { name: author.name },
      });
      if (!existingAuthor) {
        await this.authorRepository.save(this.authorRepository.create(author));
      }
    }

    console.log('Authors seeded successfully');
  }
}
