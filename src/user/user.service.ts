import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  HttpStatus,
} from '@nestjs/common'
import { UserDto } from './user.dto'
import { hashSync } from 'bcrypt'
import { PrismaService } from '../prisma/prisma.service'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(newUser: UserDto) {
    const hashedPassword = hashSync(newUser.password, 10)

    try {
      await this.prisma.user.create({
        data: {
          name: newUser.name,
          email: newUser.email,
          password: hashedPassword,
          enterprise: newUser.enterprise,
        },
      })

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Usuário criado com sucesso!',
      }
    } catch (error) {
      this.handlePrismaError(error)
    }
  }

  private handlePrismaError(error: unknown): never {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      const target = (error.meta?.target as string[]) ?? []

      if (target.includes('email')) {
        throw new ConflictException('Email já cadastrado!')
      }

      if (target.includes('enterprise')) {
        throw new ConflictException('Empresa já cadastrada!')
      }

      throw new ConflictException('Registro duplicado!')
    }

    throw new InternalServerErrorException('Erro interno do servidor')
  }
}
