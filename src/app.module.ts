import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { OffersModule } from './offers/offers.module';
import { BooksModule } from './books/books.module';
import { AuthModule } from './auth/auth.module';
import { ExternalModule } from './external/external.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [PrismaModule, UsersModule, OffersModule, BooksModule, AuthModule, ExternalModule, HttpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
