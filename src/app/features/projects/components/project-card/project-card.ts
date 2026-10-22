import {
  CurrencyPipe, DatePipe, DecimalPipe, KeyValuePipe, PercentPipe, SlicePipe, UpperCasePipe,NgStyle
} from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { Project } from '../../models/project.model';
import { Priority, Status } from '../../models/task.model';
import { TaskList } from '../task-list/task-list';
import { HighlightDirective } from '../../../../shared/directives/highlight.directive';

@Component({
  selector: 'app-project-card',
  imports: [
    TaskList, UpperCasePipe, DatePipe, CurrencyPipe,
    PercentPipe, DecimalPipe, SlicePipe, KeyValuePipe,NgStyle,HighlightDirective
  ],
  templateUrl: './project-card.html',
})
export class ProjectCard {
  project = input.required<Project>();
  projectSelected = output<Project>();

  // Fraction between 0 and 1 (0.4 = 40 %). The pipe will format it.
  completionRate = computed(() => {
    const tasks = this.project().tasks;
    if (tasks.length === 0) return 0;
    const done = tasks.filter((t) => t.status === 'Terminé').length;
    return done / tasks.length;
  });

  averageCostPerTask = computed(() => {
    const { budget, tasks } = this.project();
    return tasks.length > 0 ? budget / tasks.length : 0;
  });

  priorityCounts = computed(() => {
    const counts: Record<Priority, number> = { Haute: 0, Moyenne: 0, Basse: 0 };
    for (const task of this.project().tasks) {
      counts[task.priority]++;
    }
    return counts;
  });

  selectProject(): void {
    this.projectSelected.emit(this.project());
  }

  badgeClass(status: Status): string {
    switch (status) {
      case 'Terminé':
        return 'bg-emerald-100 text-emerald-700 ring-emerald-200';
      case 'En cours':
        return 'bg-indigo-100 text-indigo-700 ring-indigo-200';
      default:
        return 'bg-amber-100 text-amber-700 ring-amber-200';
    }
  }

  accentClass(status: Status): string {
    switch (status) {
      case 'Terminé':
        return 'border-t-emerald-500';
      case 'En cours':
        return 'border-t-indigo-500';
      default:
        return 'border-t-amber-500';
    }
  }
  get barColor(): string {
  const percentage = this.completionRate() * 100;

  if (percentage < 34) {
    return '#ef4444';
  }

  if (percentage <= 66) {
    return '#f59e0b';
  }

  return '#22c55e';
}
}