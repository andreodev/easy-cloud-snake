import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { EnterpriseController } from './enterprise/enterprise.controller';
import { EnterpriseService } from './enterprise/enterprise.service';
import { EnterpriseModule } from './enterprise/enterprise.module';
import { BankDataModule } from './bank_data/bank_data.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
     UserModule,
     AuthModule,
     EnterpriseModule,
     BankDataModule],
  controllers: [AppController, UserController, EnterpriseController],
  providers: [AppService, UserService, EnterpriseService],
})
export class AppModule {}
