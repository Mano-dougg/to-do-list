import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TaskStatus } from "./enums/taskStatus";
import { User } from "src/user/user.entity";

@Entity("tasks")
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.tasks, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;
  
  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @Column({ type: 'text', default: TaskStatus.PENDING })
  status: TaskStatus;

  @Column({ name: 'due_date', type: 'timestamp', nullable: true })
  dueDate: Date;

  @CreateDateColumn({ name: 'created_at' , type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp' })
  deletedAt: Date
}