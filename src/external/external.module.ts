import { Module } from '@nestjs/common';
import { ExternalService } from './external.service';
import { ExternalController } from './external.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [ExternalController],
  providers: [ExternalService],
  imports: [HttpModule],
})
export class ExternalModule {}
