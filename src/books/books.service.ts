import { Injectable, Logger } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ExternalService } from './../external/external.service';
import { PrismaService } from './../prisma/prisma.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class BooksService {
  private readonly logger = new Logger();

  constructor(
    private externalService: ExternalService,
    private prisma: PrismaService,
    private userService: UsersService,
  ) {}

  async getBooks(body: { search: string; terms: string }) {
    try {
      return await this.externalService.getBooks(body);
    } catch (error) {
      this.logger.error(new Date() + `Error: ${JSON.stringify(error)}`);
    }
  }

  async registerBooks(data: { name: string; password: string; title: string }) {
    const isRegistered = this.userService.findOne(data);

    console.log(isRegistered);

    await this.prisma.user.findUnique({
      where: { name: data.name, password: data.password },
    });

    if (!isRegistered) {
      return 'Not registered yet!';
    } else if ((await isRegistered).type == 'Seller') {
      const bookExists = await this.prisma.book.findFirst({
        where: { title: data.title },
      });

      if (bookExists) {
        const bookIsRegistered =
          await this.prisma.registered_Book.findFirstOrThrow({
            where: { books: bookExists },
          });

        if (!bookIsRegistered) {
          await this.prisma.registered_Book.create({
            data: {
              user_id: (await isRegistered).user_id,
              book_id: bookExists.id,
            },
          });
          return `Book ${data.title} registered to Seller ${data.name}!`;
        } else {
          return `Book already registered to Seller ${data.name}`;
        }
      }
    }
  }

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
