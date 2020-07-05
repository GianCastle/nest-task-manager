import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateTaskDto } from './dto/create-task-dto';
import { GetTaskFilterDto } from './dto/get-task-filter-dto';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskStatus } from './task-status-enum';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async getTasks(taskFiltersDto: GetTaskFilterDto): Promise<Task[]> {
    return this.taskRepository.getTasks(taskFiltersDto);
  }

  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id);
    if (!found) {
      throw new NotFoundException();
    }

    return found;
  }

  async deleteTask(taskId: number): Promise<any> {
    return this.taskRepository.removeTask(taskId);
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = await this.taskRepository.createTask(createTaskDto);

    return task;
  }

  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);

    task.status = status;
    await task.save();

    return task;
  }

  // getTasksWithFilters(taskFilterDto: GetTaskFilterDto): Task[] {
  //   const { status, search } = taskFilterDto;
  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter(task => task.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter(
  //       ({ status, title }) =>
  //         status.includes(search) || title.includes(search),
  //     );
  //   }
  //   return tasks;
  // }
}
