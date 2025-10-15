import { InvoiceService } from './invoice.service';
import { Body, Controller, Get, Post, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { FindAllParameterDto, InvoiceDto } from './invoice.dto.controller';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';

@ApiTags('invoice')
@Controller('invoice')
export class InvoiceController {

    constructor( private readonly InvoiceService: InvoiceService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Criar nova invoice' })
    @ApiResponse({ status: 201, description: 'Invoice criada com sucesso' })
    @ApiResponse({ status: 400, description: 'Dados inválidos' })
    create(@Body() invoice: InvoiceDto) {
        return this.InvoiceService.create(invoice);
    } 

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Listar invoices com filtros opcionais' })
    @ApiQuery({ name: 'status', required: false, enum: ['PENDING', 'PAID', 'OVERDUE'], description: 'Filtrar por status' })
    @ApiQuery({ name: 'enterpriseId', required: false, description: 'Filtrar por ID da empresa' })
    @ApiQuery({ name: 'value', required: false, description: 'Filtrar por valor' })
    @ApiQuery({ name: 'createdAt', required: false, description: 'Filtrar por data de criação' })
    @ApiQuery({ name: 'client', required: false, description: 'Buscar por nome do cliente (parcial)' })
    @ApiResponse({ status: 200, description: 'Lista de invoices retornada com sucesso' })
    findAll(@Query() params: FindAllParameterDto) {
        return this.InvoiceService.findAll(params);
    }
}
