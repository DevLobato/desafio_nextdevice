import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from './../prisma/prisma.service';

/* TODO:
    - RF02 Usuario, se Vendedor, cadastra Livro [OK]
      - Utilizar os recursos de Volume e Estante, do Google Books API
      - https://developers.google.com/books/docs/v1/using?hl=pt-br#WorkingVolumes
    - RF03 Comprador visualiza os Livros [ ] (Tratar no Front)
    - RF03 Comprador realiza Oferta no Livro [ ]
    - RF04 Comprador acompanha status do Livro [ ]
    - RF05 Vendedor aprova ou recusa a Oferta [ ]
    - RF06 Comprador filtra os tipos de Livro [ ]
  */

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async signup(data: { name: string; type: string; password: string }) {
    const isRegistered = await this.prisma.user.findUnique({
      where: { name: data.name, type: data.type, password: data.password },
    });

    if (!isRegistered)
      return this.prisma.user.create({
        data: {
          name: data.name,
          type: data.type,
          password: data.password,
        },
      });
  }

  async signin(data: { name: string; password: string }) {
    const isRegistered = await this.prisma.user.findUnique({
      where: { name: data.name, password: data.password },
    });

    if (!isRegistered) return 'Not registered yet!';
    else return 'Autenticated!';
  }

  async registerBooks(data: { name: string; password: string; title: string }) {
    const isRegistered = await this.prisma.user.findUnique({
      where: { name: data.name, password: data.password },
    });

    if (!isRegistered) {
      return 'Not registered yet!';
    } else if (isRegistered.type == 'Seller') {
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
              user_id: isRegistered.user_id,
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

  async registerOffer(data: {
    name: string;
    password: string;
    title: string;
    value: string;
  }) {
    const isRegistered = await this.prisma.user.findUnique({
      where: { name: data.name, password: data.password },
    });

    if (!isRegistered) {
      return 'Not registered yet! Please sign up.';
    } else if (isRegistered.type == 'Buyer') {
      const bookExists = await this.prisma.book.findFirst({
        where: { title: data.title },
      });

      console.log('Book?  => ' + bookExists.title);

      if (bookExists) {
        const bookIsRegistered = await this.prisma.registered_Book.findFirst({
          where: { books: bookExists },
        });

        console.log(
          'Book belongs to an Seller? => ' + bookIsRegistered.user_id,
        );
        if (!bookIsRegistered) {
          return `Book (${data.title}) not found!`;
        } else {
          const offerExists = await this.prisma.user_Offers.findFirst({
            where: { user_id: isRegistered.user_id },
          });

          console.log('offerExists: ' + offerExists);

          if (!offerExists) {
            const createdOffer = await this.prisma.offer.create({
              data: { status: 'Pending', value: data.value },
            });

            const registeredOfferExistis =
              await this.prisma.registered_Offer.findFirst({ where: {} });

            await this.prisma.registered_Offer.create({
              data: {
                book_id: bookExists.id,
                user_id: isRegistered.user_id,
                offer_id: createdOffer.offer_id,
              },
            });
          }
        }
      }
    }
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return `this.prisma.user.findUnique()`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
