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
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    OffersModule,
    BooksModule,
    AuthModule,
    ExternalModule,
    HttpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
})
export class AppModule {}
