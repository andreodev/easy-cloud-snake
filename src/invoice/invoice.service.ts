import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { InvoiceDto } from './invoice.dto.controller';

@Injectable()
export class InvoiceService {

    constructor( private readonly prisma: PrismaService) { }

    async create(Newinvoice: InvoiceDto) {
        try {
            const created = await this.prisma.invoice.create({
              data: {
                value: Newinvoice.value,
                description: Newinvoice.description,
                client: Newinvoice.client,
                status: Newinvoice.status,
                dueDate: new Date(Newinvoice.dueDate),
                enterpriseId: Newinvoice.enterpriseId,
              },
            })
            return created; 
        } catch (error) {
            throw new Error(`Error creating invoice: ${error.message}`);
        }
     }
}
