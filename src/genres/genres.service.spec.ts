import { Test, TestingModule } from '@nestjs/testing';
import { GenresService } from './genres.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genre } from './entities/genre.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';

describe('GenresService', () => {
  let service: GenresService;
  let repository: Repository<Genre>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GenresService,
        {
          provide: getRepositoryToken(Genre),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<GenresService>(GenresService);
    repository = module.get<Repository<Genre>>(getRepositoryToken(Genre));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new genre', async () => {
    const createGenreDto: CreateGenreDto = { name: 'Sample Genre' };
    const genreEntity = { id: 10, ...createGenreDto };

    jest.spyOn(repository, 'create').mockReturnValue(genreEntity as Genre);
    jest.spyOn(repository, 'save').mockResolvedValue(genreEntity as Genre);

    const result = await service.create(createGenreDto);

    expect(result).toEqual(genreEntity);
    expect(repository.create).toHaveBeenCalledWith(createGenreDto);
    expect(repository.save).toHaveBeenCalledWith(genreEntity);
  });

  it('should return a list of genres', async () => {
    const genresArray = [
      {
        id: 10,
        name: 'Sample Genre',
        books: [],
      },
    ];

    jest.spyOn(repository, 'find').mockResolvedValue(genresArray as Genre[]);

    const result = await service.findAll();

    expect(result).toEqual(genresArray);
    expect(repository.find).toHaveBeenCalledWith({ relations: ['books'] });
  });

  it('should return a genre by ID', async () => {
    const genreId = 10;
    const genreEntity = {
      id: genreId,
      name: 'Sample Genre',
      books: [],
    };

    jest.spyOn(repository, 'findOne').mockResolvedValue(genreEntity as Genre);

    const result = await service.findOne(genreId);

    expect(result).toEqual(genreEntity);
    expect(repository.findOne).toHaveBeenCalledWith({
      where: { id: genreId },
      relations: ['books'],
    });
  });

  it('should throw NotFoundException if genre not found', async () => {
    const genreId = 10;

    jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

    await expect(service.findOne(genreId)).rejects.toThrow(NotFoundException);
  });

  it('should update a genre', async () => {
    const genreId = 10;
    const updateGenreDto: UpdateGenreDto = { name: 'Updated Genre' };
    const genreEntity = {
      id: genreId,
      name: 'Sample Genre',
      books: [],
    };
    const updatedGenre = {
      ...genreEntity,
      ...updateGenreDto,
    };

    jest.spyOn(service, 'findOne').mockResolvedValue(genreEntity as Genre);
    jest.spyOn(repository, 'save').mockResolvedValue(updatedGenre as Genre);

    const result = await service.update(genreId, updateGenreDto);

    expect(result).toEqual(updatedGenre);
    expect(service.findOne).toHaveBeenCalledWith(genreId);
    expect(repository.save).toHaveBeenCalledWith(updatedGenre);
  });

  it('should delete a genre', async () => {
    const genreId = 10;
    const genreEntity = {
      id: genreId,
      name: 'Sample Genre',
      books: [],
    };

    jest.spyOn(service, 'findOne').mockResolvedValue(genreEntity as Genre);
    jest.spyOn(repository, 'remove').mockResolvedValue(genreEntity as Genre);

    await service.remove(genreId);

    expect(service.findOne).toHaveBeenCalledWith(genreId);
    expect(repository.remove).toHaveBeenCalledWith(genreEntity);
  });

  it('should return a list of books by a specific genre', async () => {
    const genreId = 10;
    const genreEntity = {
      id: genreId,
      name: 'Sample Genre',
      books: [{ id: 10, title: 'Sample Book' }],
    };

    jest.spyOn(service, 'findOne').mockResolvedValue(genreEntity as Genre);

    const result = await service.findBooksByGenre(genreId);

    expect(result).toEqual(genreEntity.books);
    expect(service.findOne).toHaveBeenCalledWith(genreId);
  });
});
