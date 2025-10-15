import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUUID, MaxLength, MinLength } from "class-validator";

export class EnterpriseDto {
    @ApiProperty({
        example: 'Empresa Exemplo',
        description: 'Nome da empresa',
        minLength: 3,
        maxLength: 256
    })
    @IsString()
    @MinLength(3)
    @MaxLength(256)
    nome: string;

    @ApiProperty({
        example: '12345678901234',
        description: 'CNPJ da empresa (14 dígitos)',
        minLength: 14,
        maxLength: 14
    })
    @IsString()
    @MinLength(14)
    @MaxLength(14)
    cnpj: string;

    @ApiProperty({
        example: '123e4567-e89b-12d3-a456-426614174000',
        description: 'ID do usuário que criou a empresa'
    })
    @IsUUID()
    ownerId: string;
}