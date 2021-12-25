import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'lib/guards/jwt-auth.guard';
import { NoteDto } from 'tools/dto/note.dto';
import { NoteModel } from 'tools/models/note.model';
import { NoteService } from './note.service';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('note')
@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  async CreateNote(@Body() body: NoteDto): Promise<NoteModel> {
    return this.noteService.create(body);
  }

  @Get()
  async getAllNotes(): Promise<NoteModel[]> {
    return this.noteService.findAll();
  }

  @Get(':id')
  async GetNote(@Param() params): Promise<NoteModel> {
    return this.noteService.findOne(params.id);
  }

  @Put(':id')
  async updateNote(
    @Param('id') id: string,
    @Body() noteDto: NoteDto,
  ): Promise<NoteModel> {
    return this.noteService.update(id, noteDto);
  }

  @Delete(':id')
  async removeNote(@Param('id') id: string): Promise<NoteModel> {
    return this.noteService.delete(id);
  }
}
