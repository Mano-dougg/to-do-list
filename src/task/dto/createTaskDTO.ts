import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { TaskStatus } from "../enums/taskStatus";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class CreateTaskDTO {
    
    @ApiProperty({ 
    description: 'Título da tarefa',
    example: 'Correr'
    })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ 
    description: 'Descrição detalhada da tarefa',
    example: 'Correr 5km no parque',
    })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ 
    description: 'Status atual da tarefa',
    enum: TaskStatus,
    example: TaskStatus.PENDING
    })
    @IsString()
    @IsNotEmpty()
    status: TaskStatus;

    @ApiProperty({ 
    description: 'Data de vencimento da tarefa',
    example: '2025-06-30T15:00:00.000Z',
    required: false
    })
    @IsOptional()
    @Type(() => Date)
    @IsDate()
    dueDate?: Date;
}