import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Get,
  Query,
  Req,
  Param,
  ParseIntPipe,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { UserGuard } from 'src/api/guards/user.guard';
import { TodoService } from 'src/application/services/todo.service';
import { CreateTodoDto, UpdateTodoDto } from 'src/application/DTOs/todo.dto';
import { Todo } from 'src/domain/entities/todo.entity';

@ApiTags('todos')
@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @UseGuards(UserGuard) // Protect route with UserGuard
  @UsePipes(new ValidationPipe({ whitelist: true })) // Validate and sanitize input
  @ApiOperation({ summary: 'Create a new todo' })
  @ApiResponse({
    status: 201,
    description: 'The todo has been successfully created.',
  })
  @ApiResponse({ status: 500, description: 'Failed to create todo.' })
  async create(
    @Body() createTodoDto: CreateTodoDto,
    @Req() req: any,
  ): Promise<Todo> {
    try {
      const userId = req.user.id;
      const newTodo = await this.todoService.create({
        ...createTodoDto,
        userId,
      });
      return newTodo;
    } catch (error: any) {
      console.error('Error creating Todo:', error.message);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Failed to create todo.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  @UseGuards(UserGuard) // Protect route with UserGuard
  @UsePipes(new ValidationPipe({ transform: true })) // Validate and sanitize query parameters
  @ApiOperation({ summary: 'Retrieve todos' })
  @ApiResponse({ status: 200, description: 'List of todos' })
  @ApiResponse({ status: 500, description: 'Failed to retrieve todos.' })
  async findAll(
    @Req() req: any,
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
  ): Promise<Todo[]> {
    try {
      const userId = req.user.id;
      return await this.todoService.findAll(userId);
    } catch (error: any) {
      console.error('Error fetching Todos:', error.message);
      throw new InternalServerErrorException('Failed to retrieve todos.');
    }
  }

  @Get(':id')
  @UseGuards(UserGuard) // Protect route with UserGuard
  @UsePipes(new ValidationPipe({ transform: true })) // Validate and sanitize path parameters
  @ApiOperation({ summary: 'Retrieve a todo by ID' })
  @ApiResponse({ status: 200, description: 'Todo successfully retrieved' })
  @ApiResponse({ status: 404, description: 'Todo not found' })
  @ApiResponse({ status: 500, description: 'Failed to retrieve todo.' })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: any,
  ): Promise<Todo> {
    try {
      const userId = req.user.id;
      return await this.todoService.findOne(id);
    } catch (error: any) {
      if (error instanceof NotFoundException) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      console.error('Error fetching Todo:', error.message);
      throw new InternalServerErrorException('Failed to retrieve todo.');
    }
  }

  @Put(':id')
  @UseGuards(UserGuard) // Protect route with UserGuard
  @UsePipes(new ValidationPipe({ whitelist: true })) // Validate and sanitize input
  @ApiOperation({ summary: 'Update a todo' })
  @ApiResponse({ status: 200, description: 'Todo successfully updated' })
  @ApiResponse({ status: 404, description: 'Todo not found' })
  @ApiResponse({ status: 500, description: 'Failed to update todo.' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodoDto: UpdateTodoDto,
    @Req() req: any,
  ): Promise<Todo> {
    try {
      const userId = req.user.id;
      return await this.todoService.update(id, { ...updateTodoDto, userId });
    } catch (error: any) {
      if (error instanceof NotFoundException) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      console.error('Error updating Todo:', error.message);
      throw new InternalServerErrorException('Failed to update todo.');
    }
  }

  @Delete(':id')
  @UseGuards(UserGuard) // Protect route with UserGuard
  @ApiOperation({ summary: 'Delete a todo' })
  @ApiResponse({ status: 204, description: 'Todo successfully deleted' })
  @ApiResponse({ status: 404, description: 'Todo not found' })
  @ApiResponse({ status: 500, description: 'Failed to delete todo.' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    try {
      await this.todoService.remove(id);
    } catch (error: any) {
      if (error instanceof NotFoundException) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      console.error('Error deleting Todo:', error.message);
      throw new InternalServerErrorException('Failed to delete todo.');
    }
  }
}
