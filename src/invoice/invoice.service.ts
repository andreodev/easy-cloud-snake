import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindAllParameterDto, InvoiceDto } from './invoice.dto.controller';

@Injectable()
export class InvoiceService {
  constructor(private readonly prisma: PrismaService) { }

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
      return {
        message: 'Invoice criada com sucesso!',
      }
    } catch (error) {
      throw new Error(`Error creating invoice: ${error.message}`)
    }
  }

  async findAll(params: FindAllParameterDto) {
    const where: any = {}
    // if (params.enterpriseId) {
    //   where.enterpriseId = params.enterpriseId
    // }

    // if (params.status) {
    //   where.status = params.status
    // }

    // if(params.value) {
    //   where.value = params.value
    // }

    // if (params.createdAt) {
    //   where.createdAt = params.createdAt
    // }

    // if (params.client) {
    //   where.client = params.client
    // }
    
    //reescrito
      const allowedFilters = ['enterpriseId', 'status', 'value', 'createdAt', 'client'];

      for (const key of allowedFilters) {
        if (params[key] !== undefined) {
          where[key] = params[key];
        }

      const invoices = await this.prisma.invoice.findMany({
        where,
        include: {
          enterprise: {
            select: {
              id: true,
              nome: true,
              cnpj: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      })

      return {
        message: 'Invoices encontradas com sucesso!',
        data: {
          invoices,
          total: invoices.length,
        },
      }
    }
  }
}