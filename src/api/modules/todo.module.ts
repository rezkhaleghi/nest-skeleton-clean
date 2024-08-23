import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoController } from '../controllers/v1/todo.controller';
import { TodoService } from '../../application/services/todo.service';
import { Todo } from '../../domain/entities/todo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Todo])], // Import Todo entity
  controllers: [TodoController], // Register the controller
  providers: [TodoService], // Register the service
})
export class TodoModule {}
