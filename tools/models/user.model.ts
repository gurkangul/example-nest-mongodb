import { AuditModel } from './audit.model';
import { RoleModel } from './role.model';
import * as mongoose from 'mongoose';
import { NoteModel } from './note.model';

export class UserModel {
  id: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  birthDay: Date;
  audit: AuditModel;
  roles: RoleModel[];
  notes: NoteModel[];
}

export const UserSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'User name is required'] },
  surname: { type: String, required: [true, 'User surname is required'] },
  email: {
    type: String,
    unique: true,
  },
  password: { type: String, required: [true, 'User password is required'] },
  birthDay: { type: Date, required: [true, 'User birthDay is required'] },
  audit: { type: Object },
  roles: { type: Array },
  notes: { type: Array },
});
