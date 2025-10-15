import { InvoiceService } from './invoice.service';
import { Body, Controller, Post } from '@nestjs/common';
import { InvoiceDto } from './invoice.dto.controller';

@Controller('invoice')
export class InvoiceController {

    constructor( private readonly InvoiceService: InvoiceService) { }

    @Post()
    create(@Body() invoice: InvoiceDto) {
        return this.InvoiceService.create(invoice);
    } 
}
