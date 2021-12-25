import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ResourceService } from 'lib/services/resource.service';
import { Model } from 'mongoose';
import { RoleDto } from 'tools/dto/role.dto';
import { RoleModel } from 'tools/models/role.model';

@Injectable()
export class RoleService extends ResourceService<RoleModel, RoleDto, RoleDto> {
  constructor(
    @InjectModel('Role')
    roleMongo: Model<RoleModel>,
  ) {
    super(roleMongo);
  }
}
