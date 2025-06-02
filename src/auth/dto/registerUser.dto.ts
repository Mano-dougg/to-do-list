import { IsEmail, IsNotEmpty, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDTO {
    @ApiProperty({ description: 'Nome do usuário', example: 'João Silva' })
    @IsString()
    @Min(3)
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'Email do usuário', example: 'joao@gmail.com' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ description: 'Senha do usuário', example: 'senha123' })
    @IsString()
    @IsNotEmpty()
    password: string;
}
