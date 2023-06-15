import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @Get('all')
  async getUsers() {
    return await this.userService.getUsers();
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }


  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(+id, updateUserDto);
  }

  @Patch(':id/password')
  async changePassword(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.changePassword(+id, updateUserDto);
  }


  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(+id)
  }

 
}
