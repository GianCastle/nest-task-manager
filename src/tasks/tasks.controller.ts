import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';

import { TasksService } from 'src/tasks/tasks.service';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTaskFilterDto } from './dto/get-task-filter-dto';
import { TaskStatusValidationPipe } from './pipes/tasks-status-validation.pipe';
import { Task } from './task.entity';
import { TaskStatus } from './task-status-enum';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  getAllTasks(@Query(ValidationPipe) taskFilters: GetTaskFilterDto) {
    this.taskService.getTasks(taskFilters);
  }
  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Post([])
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id', ParseIntPipe) id: number): void {
    this.taskService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  ): Promise<Task> {
    return this.taskService.updateTaskStatus(id, status);
  }
}
