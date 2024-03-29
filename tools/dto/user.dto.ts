import { RoleModel } from 'tools/models/role.model';
import { IsNotEmpty, Length, IsEmail, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { NoteModel } from 'tools/models/note.model';

export class UserCreateDto {
  @IsNotEmpty()
  @Length(2, 20)
  @ApiProperty()
  name: string;
  @ApiProperty()
  surname: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsDateString()
  birthDay: Date;
}

// tslint:disable-next-line:max-classes-per-file
export class UserUpdateDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  surname: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  birthDay: Date;
  @ApiProperty()
  roles: RoleModel[];
  @ApiProperty()
  notes: NoteModel[];
}

// tslint:disable-next-line:max-classes-per-file
export class UserLoginDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}
