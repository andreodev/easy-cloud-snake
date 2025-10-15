import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';
import { EnterpriseDto } from './enterprise.dto';

@Injectable()
export class EnterpriseService {
    constructor(private readonly prisma: PrismaService) { }


    async create(newEnterprise : EnterpriseDto) {
        try {
            const createdEnterprise = await this.prisma.enterprise.create({
                data: {
                    nome: newEnterprise.nome,
                    cnpj: newEnterprise.cnpj,
                    ownerId: newEnterprise.ownerId,
                },
                select: {
                    id: true,
                    nome: true,
                    cnpj: true,
                    ownerId: true,
                    createdAt: true,
                    updatedAt: true,
                }
            })
            await this.prisma.user.update({
                where: { id: newEnterprise.ownerId },
                data: { enterpriseId: createdEnterprise.id }
            })

            return { 
                message: 'Empresa criada com sucesso!',
                data: createdEnterprise
            };
        } catch (error) {
            if (
                error instanceof PrismaClientKnownRequestError &&
                error.code === 'P2002'
            ) {
                const field = (error.meta?.target as string[])[0];
                throw new InternalServerErrorException(
                    `${field === 'cnpj' ? 'CNPJ' : 'Outro campo'} já cadastrado(a)!`,
                );
            }
            throw new InternalServerErrorException('Erro interno do servidor');
        }
    }
}
