import { IsEnum, IsString } from "class-validator"

export enum AccountTypeEnum {
  CHECKING = 'CHECKING',
  SAVINGS = 'SAVINGS',
  PJ = 'PJ',
}

export class BankDataDto {
  @IsString()
  bank: string

  @IsString()
  branch: string

  @IsString()
  account: string

  @IsEnum(AccountTypeEnum)
  accountType: AccountTypeEnum

  @IsString()
  accountTitle: string

  @IsString()
  pixKey: string

  @IsString()
  enterpriseId: string
}
