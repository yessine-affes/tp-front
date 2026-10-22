import { Directive, HostBinding, input } from '@angular/core';

@Directive({
  selector: '[appOverdue]',
  standalone: true,
  exportAs: 'appOverdue',
})
export class OverdueDirective {
  dueDate = input<string | undefined>(undefined);
  done = input(false);

  get isOverdue(): boolean {
    const date = this.dueDate();

    if (!date || this.done()) {
      return false;
    }

    const deadline = new Date(`${date}T00:00:00`);

    if (Number.isNaN(deadline.getTime())) {
      return false;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return deadline.getTime() < today.getTime();
  }

  @HostBinding('class')
  get overdueClasses(): string {
    return this.isOverdue ? 'border-red-500 bg-red-50' : '';
  }
}