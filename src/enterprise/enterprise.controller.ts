import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { EnterpriseService } from './enterprise.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EnterpriseDto } from './enterprise.dto';

@Controller('enterprise')
export class EnterpriseController {
    constructor( private readonly enterpriseService: EnterpriseService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Criar nova empresa' })
    @ApiResponse({ status: 201, description: 'Empresa criada com sucesso' })
    @ApiResponse({ status: 409, description: 'CNPJ já cadastrado' })
    create(@Body() enterprise: EnterpriseDto) {
        return this.enterpriseService.create(enterprise);
    }
}
