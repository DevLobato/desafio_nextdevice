import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  create(@Body() body: { name: any; type: any; password: any }) {
    return this.authService.signup(body);
  }

  @Post('/signin')
  login(@Body() body: { name: any; password: any }) {
    return this.authService.signin(body);
  }

  @Get()
  findAll() {
    return `this.authService.findAll();`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `this.authService.findOne(+id);`;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return `this.authService.update(+id, updateAuthDto);`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `this.authService.remove(+id);`;
  }
}
