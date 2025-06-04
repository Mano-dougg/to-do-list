import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDTO } from './dto/createTaskDTO';
import { UpadateTaskDTO } from './dto/updateTaskDTO';
import { Task } from './task.entity';
import { 
  ApiBearerAuth, 
  ApiOperation, 
  ApiParam, 
  ApiResponse, 
  ApiTags, 
  ApiBody,
  ApiExtraModels,
  getSchemaPath 
} from '@nestjs/swagger';
import { TaskStatus } from './enums/taskStatus';
import { UserEmail } from 'src/common/decorators/userEmail';

@ApiTags('Tasks')
@ApiBearerAuth()
@ApiExtraModels(Task, CreateTaskDTO, UpadateTaskDTO)
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiOperation({ summary: 'Criar nova tarefa' })
  @ApiBody({
    description: 'Dados da nova tarefa',
    schema: {
      $ref: getSchemaPath(CreateTaskDTO),
      example: {
        title: 'Correr',
        description: 'Correr 5km no parque',
        status: TaskStatus.PENDING,
        dueDate: '2025-06-30T15:00:00.000Z'
      }
    }
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Tarefa criada com sucesso',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Task cadastrada com sucesso'
        }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  async createTask(@UserEmail() userEmail: string, @Body() createTaskDTO: CreateTaskDTO): Promise<string> {
    return await this.taskService.createTask(userEmail, createTaskDTO);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar uma tarefa existente' })
  @ApiParam({ name: 'id', description: 'ID da tarefa', example: 1 })
  @ApiBody({
    description: 'Dados para atualização da tarefa',
    schema: {
      $ref: getSchemaPath(UpadateTaskDTO),
      example: {
        title: 'Correr (revisado)',
        description: 'Correr 5km no parque',
        status: TaskStatus.COMPLETED,
        dueDate: '2025-07-15T15:00:00.000Z'
      }
    }
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Tarefa atualizada com sucesso',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'task atualizada com sucesso'
        }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 404, description: 'Tarefa não encontrada' })
  async updateTask(
    @Param('id') taskId: number,
    @Body() updateTaskDTO: UpadateTaskDTO,
  ): Promise<string> {
    return await this.taskService.updateTask(taskId, updateTaskDTO);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as tarefas do usuário' })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de tarefas', 
    schema: {
      type: 'array',
      items: {
        allOf: [
          { $ref: getSchemaPath(Task) }
        ]
      },
      example: [
        {
          id: 1,
          title: 'Correr',
          description: 'Correr 5km no parque',
          status: TaskStatus.PENDING,
          dueDate: '2025-06-30T15:00:00.000Z',
          createdAt: '2025-06-01T10:00:00.000Z',
          updatedAt: '2025-06-01T10:00:00.000Z',
          deletedAt: null,
        },
        {
          id: 2,
          title: 'Estudar NestJS',
          description: 'Estudar sobre controllers e services',
          status: TaskStatus.COMPLETED,
          dueDate: '2025-06-15T15:00:00.000Z',
          createdAt: '2025-06-02T09:00:00.000Z',
          updatedAt: '2025-06-10T16:45:00.000Z',
          deletedAt: null,
        }
      ]
    }
  })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  async getUserTasks(@UserEmail() userEmail: string): Promise<Task[]> {
    return await this.taskService.getAllByUser(userEmail);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar uma tarefa pelo ID' })
  @ApiParam({ name: 'id', description: 'ID da tarefa', example: 1 })
  @ApiResponse({ 
    status: 200, 
    description: 'Tarefa encontrada', 
    schema: {
      allOf: [
        { $ref: getSchemaPath(Task) },
        {
          example: {
            id: 1,
            title: 'Correr',
            description: 'Correr 5km no parque',
            status: TaskStatus.PENDING,
            dueDate: '2025-06-30T15:00:00.000Z',
            createdAt: '2025-06-01T10:00:00.000Z',
            updatedAt: '2025-06-01T10:00:00.000Z',
            deletedAt: null
          }
        }
      ]
    }
  })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ 
    status: 404, 
    description: 'Tarefa não encontrada',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Tarefa não encontrada' },
        error: { type: 'string', example: 'Not Found' }
      }
    }
  })
  async findOne(@Param('id') taskId: number): Promise<Task | null> {
    const task = await this.taskService.findOne(taskId);
    if (!task) {
      throw new NotFoundException('Tarefa não encontrada');
    }
    return task;
  }

  @Get('status/:status')
  @ApiOperation({ summary: 'Buscar tarefas por status' })
  @ApiParam({ 
    name: 'status', 
    description: 'Status da tarefa', 
    enum: TaskStatus,
    example: TaskStatus.PENDING
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Tarefas encontradas', 
    schema: {
      type: 'array',
      items: {
        allOf: [
          { $ref: getSchemaPath(Task) }
        ]
      },
      example: [
        {
          id: 1,
          title: 'Correr',
          description: 'Correr 5km no parque',
          status: TaskStatus.PENDING,
          dueDate: '2025-06-30T15:00:00.000Z',
          createdAt: '2025-06-01T10:00:00.000Z',
          updatedAt: '2025-06-01T10:00:00.000Z',
          deletedAt: null,
        },
        {
          id: 3,
          title: 'Médico',
          description: 'Consulta de rotina',
          status: TaskStatus.PENDING,
          dueDate: '2025-07-20T09:00:00.000Z',
          createdAt: '2025-06-05T14:30:00.000Z',
          updatedAt: '2025-06-05T14:30:00.000Z',
          deletedAt: null,
        }
      ]
    }
  })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  async findByStatus(
    @Param('status') status: TaskStatus,
  ): Promise<Task[]> {
    return await this.taskService.findByStatus(status);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir uma tarefa' })
  @ApiParam({ name: 'id', description: 'ID da tarefa', example: 1 })
  @ApiResponse({ 
    status: 200, 
    description: 'Tarefa excluída com sucesso',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'task excluída com sucesso'
        }
      }
    }
  })

  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ 
    status: 404, 
    description: 'Tarefa não encontrada',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Tarefa não encontrada' },
        error: { type: 'string', example: 'Not Found' }
      }
    }
  })
  async deleteTask(@Param('id') taskId: number): Promise<string> {
    return await this.taskService.deleteTask(taskId);
  }
}
