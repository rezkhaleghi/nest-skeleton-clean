import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoController } from '../controllers/v1/todo.controller';
import { TodoService } from '../../application/services/todo.service';
import { Todo, TodoSchema } from '../../domain/entities/todo.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]),
  ],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
