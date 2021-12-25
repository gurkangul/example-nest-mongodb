import { ApiProperty } from '@nestjs/swagger';

export class NoteDto {
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
}
