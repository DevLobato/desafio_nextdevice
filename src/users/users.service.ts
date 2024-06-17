import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from './../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // Passar registerOffer para OfferService
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

      if (bookExists) {
        const bookIsRegistered = await this.prisma.registered_Book.findFirst({
          where: { books: bookExists },
        });

        if (!bookIsRegistered) {
          return `Book (${data.title}) not found!`;
        } else {
          const offerExists = await this.prisma.user_Offers.findFirst({
            where: { user_id: isRegistered.user_id },
          });

          if (!offerExists) {
            const createdOffer = await this.prisma.offer.create({
              data: { status: 'Pending', value: data.value },
            });

            const registeredOfferExistis =
              await this.prisma.registered_Offer.findFirst({
                where: { offer_id: createdOffer.offer_id },
              });

            if (registeredOfferExistis != null) {
              await this.prisma.registered_Offer.create({
                data: {
                  book_id: bookExists.id,
                  user_id: isRegistered.user_id,
                  offer_id: createdOffer.offer_id,
                },
              });

              const registeredOffer = this.prisma.registered_Offer.findFirst({
                where: { offer_id: bookExists.id },
              });
              return `Offer ${(await registeredOffer).offer_id} registered to User: ${isRegistered.name} and Book: ${bookExists.title}`;
            } else {
              return 'Offer already exists!';
            }
          }
        }
      }
    }
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(data: { name: string; password: string }) {
    const user = await this.prisma.user.findUnique({
      where: { name: data.name, password: data.password },
    });

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
