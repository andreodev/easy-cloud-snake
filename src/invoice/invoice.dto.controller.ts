import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsString, IsOptional, IsEnum, IsUUID } from "class-validator";

export enum InvoiceStatusEnum {
    PENDING = 'PENDING',
    PAID = 'PAID',
    OVERDUE = 'OVERDUE'
}

export class InvoiceDto {
  @ApiProperty({
    example: '1500.00',
    description: 'Valor da fatura',
  })
  @IsString()
  @ApiProperty({
    example: 'Serviços de consultoria',
    description: 'Descrição da fatura',
  })
  @IsString()
  value: string

  @ApiProperty({
    example: 'Serviços de consultoria',
    description: 'Descrição da fatura',
  })
  @IsString()
  description: string

  @ApiProperty({
    example: 'Cliente XYZ',
    description: 'Nome do cliente',
  })
  @IsString()
  client: string

  @ApiProperty({
    example: 'PENDING',
    description: 'Status da fatura',
  })
  status: InvoiceStatusEnum

  @ApiProperty({
    example: '2023-12-31',
    description: 'Data de vencimento',
  })
  @IsDateString()
  dueDate: Date

  @ApiProperty({
    example: '2023-12-01',
    description: 'Data de criação',
  })
  @IsDateString()
  createdAt: Date

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID da empresa associada à fatura',
  })
  @IsString()
  enterpriseId: string
}

export class FindAllParameterDto {
  @ApiProperty({
    required: false,
    enum: InvoiceStatusEnum,
    description: 'Filtrar por status da fatura',
    example: 'PENDING'
  })
  @IsOptional()
  @IsEnum(InvoiceStatusEnum)
  status?: InvoiceStatusEnum

  @ApiProperty({
    required: false,
    description: 'Filtrar por ID da empresa',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsOptional()
  @IsUUID()
  enterpriseId?: string

  @ApiProperty({
    required: false,
    description: 'Filtrar por valor da fatura',
    example: '1500.00'
  })
  @IsOptional()
  @IsString()
  value?: string

  @ApiProperty({
    required: false,
    description: 'Filtrar por data de criação',
    example: '2023-12-01'
  })
  @IsOptional()
  @IsDateString()
  createdAt?: Date

  @ApiProperty({
    required: false,
    description: 'Buscar por nome do cliente (busca parcial)',
    example: 'João'
  })
  @IsOptional()
  @IsString()
  client?: string
}

