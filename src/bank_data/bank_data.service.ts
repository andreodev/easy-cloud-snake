import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BankDataDto } from './bank_data.dto';

@Injectable()
export class BankDataService {
    constructor(private readonly prisma: PrismaService) { }

    async create(newBankData: BankDataDto) {
        try {
            const created = await this.prisma.bankData.create({
              data: {
                bank: newBankData.bank,
                branch: newBankData.branch,
                account: newBankData.account,
                accountType: newBankData.accountType,
                pixKey: newBankData.pixKey,
                enterpriseId: newBankData.enterpriseId,
              },
            })
            return created;
        } catch (error) {
            throw new Error('Error creating bank data');
        }
    }
}
