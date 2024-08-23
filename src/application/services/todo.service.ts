import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from '../../domain/entities/todo.entity';
import { CreateTodoDto, UpdateTodoDto } from '../DTOs/todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    try {
      const todo = this.todoRepository.create(createTodoDto);
      return await this.todoRepository.save(todo);
    } catch (error) {
      throw new InternalServerErrorException('Error creating todo');
    }
  }

  async findAll(userId: number): Promise<Todo[]> {
    try {
      return await this.todoRepository.find({ where: { userId } });
    } catch (error) {
      throw new InternalServerErrorException('Error fetching todos');
    }
  }

  async findOne(id: number): Promise<Todo> {
    try {
      const todo = await this.todoRepository.findOne({ where: { id } });
      if (!todo) {
        throw new NotFoundException(`Todo with id ${id} not found`);
      }
      return todo;
    } catch (error) {
      throw new InternalServerErrorException('Error fetching todo');
    }
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    try {
      const result = await this.todoRepository.update(id, updateTodoDto);
      if (result.affected === 0) {
        throw new NotFoundException(`Todo with id ${id} not found`);
      }
      return await this.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException('Error updating todo');
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const result = await this.todoRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Todo with id ${id} not found`);
      }
    } catch (error) {
      throw new InternalServerErrorException('Error deleting todo');
    }
  }
}
