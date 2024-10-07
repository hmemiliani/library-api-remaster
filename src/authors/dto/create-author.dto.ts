import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateAuthorDto {
  @ApiProperty({ description: 'The name of the author' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
