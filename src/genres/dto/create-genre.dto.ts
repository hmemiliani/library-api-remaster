import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateGenreDto {
  @ApiProperty({ description: 'Name of the genre' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
