import { Module } from '@nestjs/common';
import { ExternalService } from './external.service';
import { ExternalController } from './external.controller';
import { HttpModule } from '@nestjs/axios';
import { PrismaService } from './../prisma/prisma.service';
import { PrismaModule } from './../prisma/prisma.module';

@Module({
  controllers: [ExternalController],
  providers: [ExternalService, PrismaService],
  imports: [HttpModule, PrismaModule],
})
export class ExternalModule {}
