import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateAuthorDto {
  @ApiProperty({ description: 'Name of the author', required: false })
  @IsString()
  @IsOptional()
  name?: string;
}
