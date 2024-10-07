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
import { GenresService } from './genres.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Genre } from './entities/genre.entity';
import { Book } from '../books/entities/book.entity';

@ApiTags('Genres')
@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new genre' })
  @ApiResponse({
    status: 201,
    description: 'The genre has been successfully created.',
    type: Genre,
  })
  @ApiBody({ type: CreateGenreDto })
  create(@Body() createGenreDto: CreateGenreDto) {
    return this.genresService.create(createGenreDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get a list of all genres' })
  @ApiResponse({ status: 200, description: 'List of genres.', type: [Genre] })
  findAll() {
    return this.genresService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get details of a genre by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the genre' })
  @ApiResponse({ status: 200, description: 'Genre details.', type: Genre })
  @ApiResponse({ status: 404, description: 'Genre not found.' })
  findOne(@Param('id') id: number) {
    return this.genresService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a genre by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the genre' })
  @ApiBody({ type: UpdateGenreDto })
  @ApiResponse({
    status: 200,
    description: 'The genre has been successfully updated.',
    type: Genre,
  })
  @ApiResponse({ status: 404, description: 'Genre not found.' })
  update(@Param('id') id: number, @Body() updateGenreDto: UpdateGenreDto) {
    return this.genresService.update(id, updateGenreDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a genre by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the genre' })
  @ApiResponse({
    status: 200,
    description: 'The genre has been successfully deleted.',
    type: Genre,
  })
  @ApiResponse({ status: 404, description: 'Genre not found.' })
  remove(@Param('id') id: number) {
    return this.genresService.remove(id);
  }

  @Get(':id/books')
  @ApiOperation({ summary: 'Get all books in a specific genre' })
  @ApiParam({ name: 'id', description: 'The ID of the genre' })
  @ApiResponse({
    status: 200,
    description: 'List of books in the genre.',
    type: [Book],
  })
  @ApiResponse({ status: 404, description: 'Genre not found.' })
  findBooksByGenre(@Param('id') id: number) {
    return this.genresService.findBooksByGenre(id);
  }
}
