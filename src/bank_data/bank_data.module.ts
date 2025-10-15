import { Module } from '@nestjs/common';
import { BankDataService } from './bank_data.service';
import { BankDataController } from './bank_data.controller';

@Module({
  providers: [BankDataService],
  controllers: [BankDataController]
})
export class BankDataModule {}
