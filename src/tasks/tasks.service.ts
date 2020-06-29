import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';

import { CreateTaskDto } from './dto/create-task-dto';
import { GetTaskFilterDto } from './dto/get-task-filter-dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(taskFilterDto: GetTaskFilterDto): Task[] {
    const { status, search } = taskFilterDto;
    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter(task => task.status === status);
    }

    if (search) {
      tasks = tasks.filter(
        ({ status, title }) =>
          status.includes(search) || title.includes(search),
      );
    }

    return tasks;
  }

  getTaskById(taskId: string): Task {
    const found = this.tasks.find(({ id }) => id === Number(taskId));
    if (!found) throw new NotFoundException();

    return found;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: this.tasks.length + 1,
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  deleteTask(taskId: string): void {
    this.tasks = this.tasks.filter(v => v.id !== taskId);
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;

    return task;
  }
}
