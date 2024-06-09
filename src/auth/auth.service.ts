import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async create(data: { name: string; type: string; password: string }) {
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
    else return 'Already registered!';
  }

  async login(data: { name: string; password: string }) {
    const isRegistered = await this.prisma.user.findUnique({
      where: { name: data.name, password: data.password },
    });

    if (!isRegistered) return 'Not registered yet!';
    else return 'Autenticated!';
  }

  /* TODO:
    - RF01 Login e SingUp sera realizado pelo authService [OK]
  */
}
