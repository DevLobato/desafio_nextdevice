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

  // - @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
  // - @ApiResponse({ status: 403, description: 'Forbidden.'})
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

  @Get()
  findOne(@Body() body: { name: string; password: string }) {
    return this.usersService.findOne(body);
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
