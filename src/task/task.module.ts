import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { UserModule } from 'src/user/user.module';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Task]),
        UserModule,
    ],
    controllers: [TaskController],
    providers: [TaskService],
})
export class TaskModule {}
