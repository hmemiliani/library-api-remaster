import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './entities/author.entity';
import { Book } from '../books/entities/book.entity';

@ApiTags('Authors')
@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new author' })
  @ApiResponse({
    status: 201,
    description: 'The author has been successfully created.',
    type: Author,
  })
  @ApiBody({ type: CreateAuthorDto })
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorsService.create(createAuthorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get a list of all authors' })
  @ApiResponse({ status: 200, description: 'List of authors.', type: [Author] })
  findAll() {
    return this.authorsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get details of an author by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the author' })
  @ApiResponse({ status: 200, description: 'Author details.', type: Author })
  @ApiResponse({ status: 404, description: 'Author not found.' })
  findOne(@Param('id') id: number) {
    return this.authorsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an author by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the author' })
  @ApiBody({ type: UpdateAuthorDto })
  @ApiResponse({
    status: 200,
    description: 'The author has been successfully updated.',
    type: Author,
  })
  @ApiResponse({ status: 404, description: 'Author not found.' })
  update(@Param('id') id: number, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorsService.update(id, updateAuthorDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an author by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the author' })
  @ApiResponse({
    status: 200,
    description: 'The author has been successfully deleted.',
    type: Author,
  })
  @ApiResponse({ status: 404, description: 'Author not found.' })
  remove(@Param('id') id: number) {
    return this.authorsService.remove(id);
  }

  @Get(':id/books')
  @ApiOperation({ summary: 'Get all books by a specific author' })
  @ApiParam({ name: 'id', description: 'The ID of the author' })
  @ApiResponse({
    status: 200,
    description: 'List of books by the author.',
    type: [Book],
  })
  @ApiResponse({ status: 404, description: 'Author not found.' })
  findBooksByAuthor(@Param('id') id: number) {
    return this.authorsService.findBooksByAuthor(id);
  }
}
