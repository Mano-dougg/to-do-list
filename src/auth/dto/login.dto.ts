import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDTO {
    @ApiProperty({ description: 'Email do usuário', example: 'joao@gmail.com' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ description: 'Senha do usuário', example: 'senha123' })
    @IsString()
    @IsNotEmpty()
    password: string;
}