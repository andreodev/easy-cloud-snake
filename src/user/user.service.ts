import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common'
import {
  FindAllParametersDto,
  FindAllResponseDto,
  UserDto,
} from './user.dto'
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
          `${field === 'email' ? 'Email' : 'cpf'} já cadastrado(a)!`,
        )
      }
      throw new InternalServerErrorException('Erro interno do servidor')
    }
  }

  async findAll(params: FindAllParametersDto): Promise<FindAllResponseDto> {
    try {
      const where: FindAllParametersDto = {}

      if (params.email) where.email = params.email

      const users = await this.prisma.user.findMany({
          where,
          take: 100,
        select: {
          name: true,
          email: true,
          cpf: true,
          createdAt: true,
          updatedAt: true,
        },
      })

      return {
        message: 'Usuários encontrados com sucesso!',
        data: { users },
      }
    } catch (error: unknown) {
      throw new InternalServerErrorException('Erro interno do servidor')
    }
  }

  findByEmail(email: string) {
    if(!email) return null

    return this.prisma.user.findUnique({ where: { email } })
  }
 }