import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateGenreDto {
  @ApiProperty({ description: 'Name of the genre', required: false })
  @IsString()
  @IsOptional()
  name?: string;
}
