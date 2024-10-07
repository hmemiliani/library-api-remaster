import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genre } from '../genres/entities/genre.entity';

@Injectable()
export class GenresSeeder {
  constructor(
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
  ) {}

  async seed() {
    const genres = [
      { name: 'Fantasy' },
      { name: 'Science Fiction' },
      { name: 'Adventure' },
    ];

    for (const genre of genres) {
      const existingGenre = await this.genreRepository.findOne({
        where: { name: genre.name },
      });
      if (!existingGenre) {
        await this.genreRepository.save(this.genreRepository.create(genre));
      }
    }

    console.log('Genres seeded successfully');
  }
}
