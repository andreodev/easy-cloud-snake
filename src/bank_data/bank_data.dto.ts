import { ApiProperty } from "@nestjs/swagger"
import { IsEnum, IsString } from "class-validator"

export enum AccountTypeEnum {
  CHECKING = 'CHECKING',
  SAVINGS = 'SAVINGS',
  PJ = 'PJ',
}

export class BankDataDto {
  @IsString()
  @ApiProperty({
    example: 'Banco do Brasil',
    description: 'Nome do banco',
  })
  bank: string

  @IsString()
  @ApiProperty({
    example: 'Agência Central',
    description: 'Nome da agência',
  })
  branch: string

  @IsString()
  @ApiProperty({
    example: '123456',
    description: 'Número da conta',
  })
  account: string

  @IsEnum(AccountTypeEnum)
  @ApiProperty({
    example: 'CHECKING',
    description: 'Tipo de conta',
  })
  accountType: AccountTypeEnum

  @IsString()
  @ApiProperty({
    example: 'Conta Corrente',
    description: 'Título da conta',
  })
  accountTitle: string

  @IsString()
  @ApiProperty({
    example: 'abcd1234',
    description: 'Chave Pix',
  })
  pixKey: string

  @IsString()
  @ApiProperty({
    example: 'efgh5678',
    description: 'ID da empresa',
  })
  enterpriseId: string
}
