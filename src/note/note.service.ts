import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ResourceService } from 'lib/services/resource.service';
import { Model } from 'mongoose';
import { NoteDto } from 'tools/dto/note.dto';
import { NoteModel } from 'tools/models/note.model';

@Injectable()
export class NoteService extends ResourceService<NoteModel, NoteDto, NoteDto> {
  constructor(
    @InjectModel('Note')
    noteMongo: Model<NoteModel>,
  ) {
    super(noteMongo);
  }
}
