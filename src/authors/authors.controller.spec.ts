import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './entities/author.entity';

describe('AuthorsController', () => {
  let controller: AuthorsController;
  let service: AuthorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthorsController],
      providers: [
        {
          provide: AuthorsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            findBooksByAuthor: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthorsController>(AuthorsController);
    service = module.get<AuthorsService>(AuthorsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new author', async () => {
    const createAuthorDto: CreateAuthorDto = { name: 'Sample Author' };
    const createdAuthor = { id: 10, ...createAuthorDto };

    jest.spyOn(service, 'create').mockResolvedValue(createdAuthor as Author);

    const result = await controller.create(createAuthorDto);

    expect(result).toEqual(createdAuthor);
    expect(service.create).toHaveBeenCalledWith(createAuthorDto);
  });

  it('should return a list of authors', async () => {
    const authorsArray = [{ id: 10, name: 'Sample Author' }];

    jest.spyOn(service, 'findAll').mockResolvedValue(authorsArray as Author[]);

    const result = await controller.findAll();

    expect(result).toEqual(authorsArray);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return an author by ID', async () => {
    const authorId = 10;
    const author = { id: authorId, name: 'Sample Author' };

    jest.spyOn(service, 'findOne').mockResolvedValue(author as Author);

    const result = await controller.findOne(authorId);

    expect(result).toEqual(author);
    expect(service.findOne).toHaveBeenCalledWith(authorId);
  });

  it('should update an author', async () => {
    const authorId = 10;
    const updateAuthorDto: UpdateAuthorDto = { name: 'Updated Author' };
    const updatedAuthor = { id: authorId, ...updateAuthorDto };

    jest.spyOn(service, 'update').mockResolvedValue(updatedAuthor as Author);

    const result = await controller.update(authorId, updateAuthorDto);

    expect(result).toEqual(updatedAuthor);
    expect(service.update).toHaveBeenCalledWith(authorId, updateAuthorDto);
  });

  it('should delete an author', async () => {
    const authorId = 10;
    const deletedAuthor = { id: authorId, name: 'Sample Author' };

    jest.spyOn(service, 'remove').mockResolvedValue(deletedAuthor as Author);

    const result = await controller.remove(authorId);

    expect(result).toEqual(deletedAuthor);
    expect(service.remove).toHaveBeenCalledWith(authorId);
  });

  it('should return a list of books by a specific author', async () => {
    const authorId = 10;
    const booksArray = [{ id: 10, title: 'Sample Book', authorId }];

    jest.spyOn(service, 'findBooksByAuthor').mockResolvedValue(booksArray);

    const result = await controller.findBooksByAuthor(authorId);

    expect(result).toEqual(booksArray);
    expect(service.findBooksByAuthor).toHaveBeenCalledWith(authorId);
  });
});
