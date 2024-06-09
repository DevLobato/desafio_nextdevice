import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // TODO:
  // - @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
  // - @ApiResponse({ status: 403, description: 'Forbidden.'})
  @Post('/signup')
  signup(@Body() body: { name: any; type: any; password: any }) {
    return this.usersService.signup(body);
  }

  @Post('/signin')
  signin(@Body() body: { name: any; password: any }) {
    return this.usersService.signin(body);
  }

  @Post('/register_books')
  registerBook(@Body() body: { name: any; password: any; title: any }) {
    return this.usersService.registerBooks(body);
  }

  @Post('/register_offers')
  registerOffer(
    @Body() body: { name: any; password: any; title: any; value: any },
  ) {
    return this.usersService.registerOffer(body);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
