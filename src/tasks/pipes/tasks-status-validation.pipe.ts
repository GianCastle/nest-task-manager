import { BadRequestException, PipeTransform } from '@nestjs/common';

import { TaskStatus } from '../tasks.model';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];

  transform(value: string): string {
    const _uppercased = value.toUpperCase();

    if (!this.isStatusValid(_uppercased))
      throw new BadRequestException('Status is invalid');

    return _uppercased;
  }

  private isStatusValid(status: string) {
    const isThere = st => st === status;
    return this.allowedStatuses.some(isThere);
  }
}
