import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common'
import { UserDto } from './user.dto'
import { hashSync } from 'bcrypt'
import { PrismaService } from '../prisma/prisma.service'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(newUser: UserDto) {
    try {
      await this.prisma.user.create({
        data: { ...newUser, password: hashSync(newUser.password, 10) },
      })
      return { message: 'Usuário criado com sucesso!' }
    } catch (error: Error | any) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        const field = (error.meta?.target as string[])[0]
        throw new ConflictException(
          `${field === 'email' ? 'Email' : 'Empresa'} já cadastrado(a)!`,
        )
      }
      throw new InternalServerErrorException('Erro interno do servidor')
    }
  }
}
