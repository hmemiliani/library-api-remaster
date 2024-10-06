import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './entities/book.entity';
import { UpdateBookDto } from './dto/update-book.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo libro' })
  @ApiResponse({
    status: 201,
    description: 'Libro creado exitosamente.',
    type: Book,
  })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos.' })
  async create(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.booksService.create(createBookDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener la lista de libros' })
  @ApiResponse({ status: 200, description: 'Lista de libros.', type: [Book] })
  async findAll(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get details of a book by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the book' })
  @ApiResponse({ status: 200, description: 'Book details', type: Book })
  @ApiResponse({ status: 404, description: 'Book not found' })
  async findOne(@Param('id') id: number): Promise<Book> {
    return this.booksService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a book by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the book' })
  @ApiBody({ type: UpdateBookDto })
  @ApiResponse({
    status: 200,
    description: 'The book has been successfully updated.',
    type: Book,
  })
  @ApiResponse({ status: 404, description: 'Book not found' })
  async update(
    @Param('id') id: number,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<Book> {
    return this.booksService.update(+id, updateBookDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a book by ID (logical deletion)' })
  @ApiParam({ name: 'id', description: 'The ID of the book' })
  @ApiResponse({
    status: 200,
    description: 'The book has been successfully deleted.',
    type: Book,
  })
  @ApiResponse({ status: 404, description: 'Book not found' })
  async remove(@Param('id') id: number): Promise<Book> {
    return this.booksService.remove(+id);
  }
}
