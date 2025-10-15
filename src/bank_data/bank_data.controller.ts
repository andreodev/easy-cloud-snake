import { Body, Controller, Post } from '@nestjs/common';
import { BankDataDto } from './bank_data.dto';
import { BankDataService } from './bank_data.service';

@Controller('bank')
export class BankDataController {

    constructor( private readonly bankDataService: BankDataService) { }

    @Post()
    create(@Body() bank_data: BankDataDto) {
        return this.bankDataService.create(bank_data)
    }
}
