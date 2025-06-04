import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDTO } from './dto/createTaskDTO';
import { UpadateTaskDTO } from './dto/updateTaskDTO';
import { UserService } from 'src/user/user.service';
import { TaskStatus } from './enums/taskStatus';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
        private userService: UserService,
    ) {}

    async createTask(userEmail: string, createTaskDTO: CreateTaskDTO): Promise<string> {
        const user = await this.userService.findOneByEmail(userEmail);

        const task = new Task();
        task.title = createTaskDTO.title;
        task.description = createTaskDTO.description;
        task.status = createTaskDTO.status;
        task.dueDate = createTaskDTO.dueDate;
        task.user = user;

        await this.taskRepository.save(task);

        return 'Task cadastrada com sucesso';
    }

    async updateTask(taskId: number, upadateTaskDTO: UpadateTaskDTO): Promise<string> {
        await this.taskRepository.update(taskId, upadateTaskDTO)
        
        return 'task atualizada com sucesso';
    }

    async findOne(taskId: number): Promise<Task | null> {
        return this.taskRepository.findOne({where: { id: taskId }});
    }

    async findByStatus(status: TaskStatus): Promise<Task[]> {
        return this.taskRepository.find({
            where: { status : status },
        });
    }

    async getAllByUser(userEmail: string): Promise<Task[]> {
        const user = await this.userService.findOneByEmail(userEmail);
        
        const tasks = await this.taskRepository.find({
            where: { user: { id: user.id } },
        });
        
        return tasks;
    }

    async deleteTask(taskId: number): Promise<string> {
        await this.taskRepository.softDelete(taskId)
        return 'task excluída com sucesso';
    }
}
