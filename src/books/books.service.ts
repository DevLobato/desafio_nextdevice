import { Injectable, Logger } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ExternalService } from './../external/external.service';
import { PrismaService } from './../prisma/prisma.service';

@Injectable()
export class BooksService {
  private readonly logger = new Logger();

  constructor(
    private externalService: ExternalService,
    private prisma: PrismaService,
  ) {}

  async getBooks(search: string, terms: string) {
    try {
      return await this.externalService.getBooks(search, terms);
    } catch (error) {
      this.logger.error(new Date() + `Error: ${JSON.stringify(error)}`);
    }
  }

  async create() {}

  findAll() {
    return this.prisma.book.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
