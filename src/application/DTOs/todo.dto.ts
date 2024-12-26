import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TodoStatus } from 'src/domain/enums/todo.enum';

export class CreateTodoDto {
  @ApiProperty({ example: 'Buy groceries' })
  title: string;

  @ApiProperty({ example: 'Milk, eggs, and bread' })
  description?: string;

  @ApiProperty({ enum: TodoStatus, default: TodoStatus.IN_PROGRESS })
  status?: TodoStatus;

  @IsString()
  @IsNotEmpty()
  userId: string;
}

export class UpdateTodoDto {
  @IsString()
  user: string;

  @ApiPropertyOptional({ example: 'Buy groceries' })
  @IsString()
  title?: string;

  @ApiPropertyOptional({ example: 'Milk, eggs, and bread' })
  @IsString()
  description?: string;

  @ApiPropertyOptional({ enum: TodoStatus, default: TodoStatus.IN_PROGRESS })
  @IsEnum(TodoStatus)
  status?: TodoStatus;
}
