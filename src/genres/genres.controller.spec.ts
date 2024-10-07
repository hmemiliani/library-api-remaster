import { Test, TestingModule } from '@nestjs/testing';
import { GenresController } from './genres.controller';
import { GenresService } from './genres.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Genre } from './entities/genre.entity';

describe('GenresController', () => {
  let controller: GenresController;
  let service: GenresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GenresController],
      providers: [
        {
          provide: GenresService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            findBooksByGenre: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<GenresController>(GenresController);
    service = module.get<GenresService>(GenresService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new genre', async () => {
    const createGenreDto: CreateGenreDto = { name: 'Sample Genre' };
    const createdGenre = { id: 10, ...createGenreDto };

    jest.spyOn(service, 'create').mockResolvedValue(createdGenre as Genre);

    const result = await controller.create(createGenreDto);

    expect(result).toEqual(createdGenre);
    expect(service.create).toHaveBeenCalledWith(createGenreDto);
  });

  it('should return a list of genres', async () => {
    const genresArray = [{ id: 10, name: 'Sample Genre' }];

    jest.spyOn(service, 'findAll').mockResolvedValue(genresArray as Genre[]);

    const result = await controller.findAll();

    expect(result).toEqual(genresArray);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return a genre by ID', async () => {
    const genreId = 10;
    const genre = { id: genreId, name: 'Sample Genre' };

    jest.spyOn(service, 'findOne').mockResolvedValue(genre as Genre);

    const result = await controller.findOne(genreId);

    expect(result).toEqual(genre);
    expect(service.findOne).toHaveBeenCalledWith(genreId);
  });

  it('should update a genre', async () => {
    const genreId = 10;
    const updateGenreDto: UpdateGenreDto = { name: 'Updated Genre' };
    const updatedGenre = { id: genreId, ...updateGenreDto };

    jest.spyOn(service, 'update').mockResolvedValue(updatedGenre as Genre);

    const result = await controller.update(genreId, updateGenreDto);

    expect(result).toEqual(updatedGenre);
    expect(service.update).toHaveBeenCalledWith(genreId, updateGenreDto);
  });

  it('should delete a genre', async () => {
    const genreId = 10;

    jest.spyOn(service, 'remove').mockResolvedValue(undefined);

    const result = await controller.remove(genreId);

    expect(result).toBeUndefined();
    expect(service.remove).toHaveBeenCalledWith(genreId);
  });

  it('should return a list of books by a specific genre', async () => {
    const genreId = 10;
    const booksArray = [{ id: 10, title: 'Sample Book', genreId }];

    jest.spyOn(service, 'findBooksByGenre').mockResolvedValue(booksArray);

    const result = await controller.findBooksByGenre(genreId);

    expect(result).toEqual(booksArray);
    expect(service.findBooksByGenre).toHaveBeenCalledWith(genreId);
  });
});
