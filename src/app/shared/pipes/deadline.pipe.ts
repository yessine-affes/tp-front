import { Pipe, PipeTransform } from '@angular/core';

const MS_PER_DAY = 24 * 60 * 60 * 1000;

@Pipe({ name: 'deadline' })
export class DeadlinePipe implements PipeTransform {
  transform(dueDate: string | null | undefined): string {
    if (!dueDate) return 'Pas d’échéance';

    const [year, month, day] = dueDate.split('-').map(Number);
    const due = new Date(year, month - 1, day);
    if (isNaN(due.getTime())) return 'Pas d’échéance';

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const diff = Math.round((due.getTime() - today.getTime()) / MS_PER_DAY);

    if (diff === 0) return 'Aujourd’hui';
    if (diff === 1) return 'Demain';
    if (diff > 1) return `Dans ${diff} jours`;

    const late = -diff;
    return `En retard de ${late} jour${late > 1 ? 's' : ''}`;
  }
}