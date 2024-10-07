import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsService } from './authors.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './entities/author.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

describe('AuthorsService', () => {
  let service: AuthorsService;
  let repository: Repository<Author>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorsService,
        {
          provide: getRepositoryToken(Author),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<AuthorsService>(AuthorsService);
    repository = module.get<Repository<Author>>(getRepositoryToken(Author));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new author', async () => {
    const createAuthorDto: CreateAuthorDto = { name: 'Sample Author' };
    const authorEntity = { id: 10, ...createAuthorDto };

    jest.spyOn(repository, 'create').mockReturnValue(authorEntity as Author);
    jest.spyOn(repository, 'save').mockResolvedValue(authorEntity as Author);

    const result = await service.create(createAuthorDto);

    expect(result).toEqual(authorEntity);
    expect(repository.create).toHaveBeenCalledWith(createAuthorDto);
    expect(repository.save).toHaveBeenCalledWith(authorEntity);
  });

  it('should return a list of authors', async () => {
    const authorsArray = [
      {
        id: 10,
        name: 'Sample Author',
        books: [],
      },
    ];

    jest.spyOn(repository, 'find').mockResolvedValue(authorsArray as Author[]);

    const result = await service.findAll();

    expect(result).toEqual(authorsArray);
    expect(repository.find).toHaveBeenCalledWith({ relations: ['books'] });
  });

  it('should return an author by ID', async () => {
    const authorId = 10;
    const authorEntity = {
      id: authorId,
      name: 'Sample Author',
      books: [],
    };

    jest.spyOn(repository, 'findOne').mockResolvedValue(authorEntity as Author);

    const result = await service.findOne(authorId);

    expect(result).toEqual(authorEntity);
    expect(repository.findOne).toHaveBeenCalledWith({
      where: { id: authorId },
      relations: ['books'],
    });
  });

  it('should throw NotFoundException if author not found', async () => {
    const authorId = 10;

    jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

    await expect(service.findOne(authorId)).rejects.toThrow(NotFoundException);
  });

  it('should update an author', async () => {
    const authorId = 10;
    const updateAuthorDto: UpdateAuthorDto = { name: 'Updated Author' };
    const authorEntity = {
      id: authorId,
      name: 'Sample Author',
      books: [],
    };
    const updatedAuthor = {
      ...authorEntity,
      ...updateAuthorDto,
    };

    jest.spyOn(service, 'findOne').mockResolvedValue(authorEntity as Author);
    jest.spyOn(repository, 'save').mockResolvedValue(updatedAuthor as Author);

    const result = await service.update(authorId, updateAuthorDto);

    expect(result).toEqual(updatedAuthor);
    expect(service.findOne).toHaveBeenCalledWith(authorId);
    expect(repository.save).toHaveBeenCalledWith(updatedAuthor);
  });

  it('should delete an author', async () => {
    const authorId = 10;
    const authorEntity = {
      id: authorId,
      name: 'Sample Author',
      books: [],
    };

    jest.spyOn(service, 'findOne').mockResolvedValue(authorEntity as Author);
    jest.spyOn(repository, 'remove').mockResolvedValue(authorEntity as Author);

    const result = await service.remove(authorId);

    expect(result).toEqual(authorEntity);
    expect(service.findOne).toHaveBeenCalledWith(authorId);
    expect(repository.remove).toHaveBeenCalledWith(authorEntity);
  });

  it('should return a list of books by a specific author', async () => {
    const authorId = 10;
    const authorEntity = {
      id: authorId,
      name: 'Sample Author',
      books: [{ id: 10, title: 'Sample Book' }],
    };

    jest.spyOn(service, 'findOne').mockResolvedValue(authorEntity as Author);

    const result = await service.findBooksByAuthor(authorId);

    expect(result).toEqual(authorEntity.books);
    expect(service.findOne).toHaveBeenCalledWith(authorId);
  });
});
