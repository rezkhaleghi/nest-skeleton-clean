import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TodoStatus } from 'src/domain/enums/todo.enum';

export class CreateTodoDto {
  @ApiProperty({ example: 'Buy groceries' })
  title: string;

  @ApiProperty({ example: 'Milk, eggs, and bread' })
  description?: string;

  @ApiProperty({ enum: TodoStatus, default: TodoStatus.PENDING })
  status?: TodoStatus;

  @ApiProperty({ example: 123 })
  userId: number;
}

export class UpdateTodoDto {
  @ApiPropertyOptional({ example: 'Buy groceries' })
  title?: string;

  @ApiPropertyOptional({ example: 'Milk, eggs, and bread' })
  description?: string;

  @ApiPropertyOptional({ enum: TodoStatus, default: TodoStatus.PENDING })
  status?: TodoStatus;

  @ApiPropertyOptional({ example: 123 })
  userId?: number; // Updated field type
}
