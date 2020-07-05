import { EntityRepository, Repository } from 'typeorm';

import { CreateTaskDto } from './dto/create-task-dto';
import { NotFoundException } from '@nestjs/common';
import { Task } from './task.entity';
import { TaskStatus } from './task-status-enum';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async createTask({ title, description }: CreateTaskDto): Promise<Task> {
    const task = new Task();

    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;

    await task.save();

    return task;
  }

  async removeTask(id: number): Promise<any> {
    const task = await this.delete(id);

    if (task.affected <= 0) {
      return {
        success: false,
      };
    }

    return {
      success: true,
    };
  }
}
