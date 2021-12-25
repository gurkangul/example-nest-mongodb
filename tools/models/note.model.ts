import { AuditModel } from './audit.model';
import * as mongoose from 'mongoose';

export class NoteModel {
  id: string;
  title: string;
  description: string;
  audit: AuditModel;
}

export const NoteSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Title name is required'] },
  description: {
    type: String,
    required: [true, 'Description surname is required'],
  },
  audit: { type: Object },
});
