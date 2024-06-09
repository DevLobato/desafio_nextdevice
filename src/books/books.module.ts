import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { ExternalModule } from './../external/external.module';
import { HttpModule } from '@nestjs/axios';
import { ExternalService } from './../external/external.service';
import { PrismaModule } from './../prisma/prisma.module';
import { PrismaService } from './../prisma/prisma.service';

@Module({
  controllers: [BooksController],
  providers: [BooksService, PrismaService, ExternalService],
  imports: [ExternalModule, HttpModule, PrismaModule],
})
export class BooksModule {}
