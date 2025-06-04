import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { TaskStatus } from "../enums/taskStatus";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class UpadateTaskDTO {
    
    @ApiProperty({ 
    description: 'Título da tarefa',
    example: 'Correr',
    required: false
    })
    @IsOptional()
    @IsString()
    title?: string;

    @ApiProperty({ 
    description: 'Descrição detalhada da tarefa',
    example: 'Correr 5km no parque',
    required: false
    })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ 
    description: 'Status atual da tarefa',
    enum: TaskStatus,
    example: TaskStatus.PENDING,
    required: false
    })
    @IsOptional()
    @IsString()
    status?: TaskStatus;

    @ApiProperty({ 
    description: 'Data de vencimento da tarefa',
    example: '2025-07-15T15:00:00.000Z',
    required: false
    })
    
    @IsOptional()
    @Type(() => Date)
    @IsDate()
    dueDate?: Date;
}