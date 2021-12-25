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
import { RoleService } from './role.service';
import { RoleModel } from 'tools/models/role.model';
import { RoleDto } from 'tools/dto/role.dto';
import { JwtAuthGuard } from 'lib/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

// @UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('role')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async CreateRole(@Body() body: RoleDto): Promise<RoleModel> {
    return this.roleService.create(body);
  }

  @Get()
  async getAllRoles(): Promise<RoleModel[]> {
    return this.roleService.findAll();
  }

  @Get(':id')
  async GetRole(@Param() params): Promise<RoleModel> {
    return this.roleService.findOne(params.id);
  }

  @Put(':id')
  async updateRole(
    @Param('id') id: string,
    @Body() roleDto: RoleDto,
  ): Promise<RoleModel> {
    return this.roleService.update(id, roleDto);
  }

  @Delete(':id')
  async removeRole(@Param('id') id: string): Promise<RoleModel> {
    return this.roleService.delete(id);
  }
}
