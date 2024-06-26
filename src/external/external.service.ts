import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { PrismaService } from './../prisma/prisma.service';
// import { CreateExternalDto } from './dto/create-external.dto';
// import { UpdateExternalDto } from './dto/update-external.dto';

@Injectable()
export class ExternalService {
  private readonly logger = new Logger();
  constructor(
    private httpService: HttpService,
    private prisma: PrismaService,
  ) {}

  async getBooks(body: { search: string; terms: string }) {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get(
          `${process.env.API_URL}volumes?q=${body.search}+${body.terms}&maxresults=10&key=${process.env.API_KEY}`,
        ),
      );

      const resLen = Object.keys(data.items).length;

      let title: string;
      let author: string;
      let categories: string;
      let imgLink: string;

      for (let i = 0; i < resLen; i++) {
        if (data.items[i].volumeInfo.authors != undefined) {
          title = data.items[i].volumeInfo.title;
          author = data.items[i].volumeInfo.authors;
          categories = data.items[i].volumeInfo.categories;
          imgLink = data.items[i].volumeInfo.imageLinks.smallThumbnail;

          title = title.toString();
          author = author.toString();
          categories = categories.toString();
          imgLink = imgLink.toString();

          await this.saveBookImage(imgLink);

          const isRegistered = await this.prisma.book.findFirst({
            where: { title: title },
          });

          if (!isRegistered)
            await this.prisma.book.create({
              data: { title: title, author: author, gender: categories },
            });
        }
      }

      return 'Create Books';
    } catch (error) {
      this.logger.error(new Date() + `Error: ${JSON.stringify(error)}`);
    }
  }

  async saveBookImage(imgLink: string) {
    try {
      // chamar endpoint da AWS S3 guardando o link da imagem
    } catch (error) {
      this.logger.error(new Date() + `Error: ${JSON.stringify(error)}`);
    }
  }
}
