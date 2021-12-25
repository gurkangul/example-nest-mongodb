import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserModel } from 'tools/models/user.model';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UserCreateDto, UserLoginDto, UserUpdateDto } from 'tools/dto/user.dto';
import { Roles } from 'lib/decorators/role.decorator';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('login')
  // @HttpCode(200)
  async login(@Body() loginUserDto: UserLoginDto): Promise<UserModel> {
    return await this.userService.loginUser(loginUserDto);
  }

  @Post()
  async createUser(@Body() body: UserCreateDto): Promise<UserModel> {
    body.password = await this.userService.convertToHash(body.password);
    return await this.userService.create(body);
  }

  @Get()
  @Roles('admin')
  async getAllUsers(): Promise<UserModel[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  async getUser(@Param() params): Promise<UserModel> {
    return await this.userService.findOne(params.id);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() userUpdateDto: UserUpdateDto,
  ): Promise<UserModel> {
    return await this.userService.update(id, userUpdateDto);
  }

  @Delete(':id')
  @Roles('admin')
  async removeUser(@Param('id') id: string): Promise<UserModel> {
    return await this.userService.delete(id);
  }
}
