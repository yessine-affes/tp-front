import { DatePipe, NgClass } from '@angular/common';
import { Component, input } from '@angular/core';

import { HighlightDirective } from '../../../../shared/directives/highlight.directive';
import { OverdueDirective } from '../../../../shared/directives/overdue.directive';
import { TooltipDirective } from '../../../../shared/directives/tooltip.directive';

import { DeadlinePipe } from '../../../../shared/pipes/deadline.pipe';
import { TruncatePipe } from '../../../../shared/pipes/truncate.pipe';
import { TaskStatusLabelPipe } from '../../../../shared/pipes/task-status-label.pipe';

import { Priority, Status, Task } from '../../models/task.model';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [
    DatePipe,
    NgClass,
    DeadlinePipe,
    TruncatePipe,
    TaskStatusLabelPipe,
    HighlightDirective,
    OverdueDirective,
    TooltipDirective,
  ],
  templateUrl: './task-item.html',
})
export class TaskItem {
  task = input.required<Task>();
  showAssignee = input(true);
  assigneeName = input('Non assignée');

  statusClass(status: Status): string {
    switch (status) {
      case 'Terminé':
        return 'border-emerald-500 bg-emerald-50';

      case 'En cours':
        return 'border-indigo-500 bg-indigo-50';

      default:
        return 'border-amber-500 bg-amber-50';
    }
  }

  priorityClass(priority: Priority): string {
    switch (priority) {
      case 'Haute':
        return 'bg-rose-100 text-rose-700';

      case 'Moyenne':
        return 'bg-orange-100 text-orange-700';

      default:
        return 'bg-slate-100 text-slate-600';
    }
  }
}