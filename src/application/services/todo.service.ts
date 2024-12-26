import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from '../../domain/entities/todo.entity';
import { CreateTodoDto, UpdateTodoDto } from '../DTOs/todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name) private readonly todoModel: Model<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    try {
      const todo = new this.todoModel(createTodoDto);
      return await todo.save();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async find(page: number = 1, limit: number = 10): Promise<Todo[]> {
    try {
      const skip = (page - 1) * limit;
      return await this.todoModel.find().skip(skip).limit(limit).exec();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(id: string): Promise<Todo> {
    try {
      const todo = await this.todoModel.findById(id).exec();
      if (!todo) {
        throw new NotFoundException(`Todo with id ${id} not found`);
      }
      return todo;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    try {
      const todo = await this.todoModel
        .findByIdAndUpdate(id, updateTodoDto, { new: true })
        .exec();

      if (!todo) {
        throw new NotFoundException(`Todo with id ${id} not found`);
      }
      return todo;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const result = await this.todoModel.findByIdAndDelete(id).exec();
      if (!result) {
        throw new NotFoundException(`Todo with id ${id} not found`);
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
