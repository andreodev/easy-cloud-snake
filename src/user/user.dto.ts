import { IsString, MaxLength, MinLength, IsEmail, IsOptional } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UserDto {
  @ApiProperty({ 
    example: 'João Silva', 
    description: 'Nome do usuário',
    minLength: 3,
    maxLength: 256
  })
  @IsString()
  @MinLength(3)
  @MaxLength(256)
  name: string

  @ApiProperty({ 
    example: 'joao@email.com', 
    description: 'Email do usuário'
  })
  @IsEmail()
  email: string

  @ApiProperty({ 
    example: '123456', 
    description: 'Senha do usuário',
    minLength: 6
  })
  @IsString()
  @MinLength(6)
  password: string

  @ApiProperty({
    example: '12345678901',
    description: 'CPF do usuário'
  })
  @IsString()
  @MinLength(11)
  @MaxLength(11)
  cpf: string
}

export class UserResponseDto {
  name: string
  email: string
  cpf: string
  createdAt: Date
  updatedAt: Date
}

export class FindAllResponseDto {
  message: string
  data: {
    users: UserResponseDto[]
  }
}

export class FindAllParametersDto {
  @IsOptional()
  @IsEmail()
  email?: string
  @IsOptional()
  cpf?: string
}

export class Me {
  id: string;
  email: string;
  enterprise: string;
}
