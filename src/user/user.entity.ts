import { Task } from "src/task/task.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false, unique: true })
    email: string;

    @Column({ nullable: false })
    password: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @OneToMany(() => Task, task => task.user, { cascade: true })
    tasks: Task[];
}