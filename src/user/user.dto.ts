import { IsString, MaxLength, MinLength, IsEmail } from 'class-validator'
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
    example: 'Empresa XYZ', 
    description: 'Nome da empresa'
  })
  @IsString()
  enterprise: string
}
