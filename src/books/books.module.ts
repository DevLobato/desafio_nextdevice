import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { ExternalModule } from './../external/external.module';
import { HttpModule } from '@nestjs/axios';
import { ExternalService } from './../external/external.service';
import { UsersService } from './../users/users.service';
import { UsersModule } from './../users/users.module';

@Module({
  controllers: [BooksController],
  providers: [BooksService, ExternalService, UsersService],
  imports: [ExternalModule, HttpModule, UsersModule],
})
export class BooksModule {}
