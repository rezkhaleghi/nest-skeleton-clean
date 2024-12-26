import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TodoStatus } from '../enums/todo.enum';

@Schema({ timestamps: true })
export class Todo extends Document {
  @Prop({ required: true, maxlength: 255 })
  title: string;

  @Prop()
  description: string;

  @Prop({ type: String, enum: TodoStatus, default: TodoStatus.IN_PROGRESS })
  status: TodoStatus;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);

// For TypeORM Database Configuration (MySQL, PostgreSQL, MSSQL, etc.)
// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   UpdateDateColumn,
//   CreateDateColumn,
// } from 'typeorm';
// import { TodoStatus } from '../enums/todo.enum';

// @Entity()
// export class Todo {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column({ type: 'int' })
//   userId: number;

//   @Column({ type: 'varchar', length: 255 })
//   title: string;

//   @Column({ type: 'text', nullable: true })
//   description: string;

//   @Column({
//     type: 'tinyint',
//     enum: TodoStatus,
//     default: TodoStatus.IN_PROGRESS,
//   })
//   status: TodoStatus;

//   @CreateDateColumn()
//   createdAt: Date;

//   @UpdateDateColumn()
//   updatedAt: Date;
// }
