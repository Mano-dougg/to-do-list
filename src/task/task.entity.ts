import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
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

  @Column({ type: 'timestamp', nullable: true })
  dueDate: Date;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}