import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { UserService } from './user.service'
import { UserDto } from './user.dto'
import type { FindAllParametersDto, FindAllResponseDto  } from './user.dto'

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Criar novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso' })
  @ApiResponse({ status: 409, description: 'Email ou empresa já cadastrados' })
  create(@Body() user: UserDto) {
    return this.userService.create(user)
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Listar todos os usuários' })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuários retornada com sucesso',
  })
  findAll(@Query() params: FindAllParametersDto): Promise<FindAllResponseDto> {
    return this.userService.findAll(params)
  }
}
