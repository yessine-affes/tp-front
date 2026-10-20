import { DatePipe, NgClass } from '@angular/common';
import { Component, OnInit, inject, input, signal } from '@angular/core';
import { UserService } from '../../../../core/services/user.service';
import { DeadlinePipe } from '../../../../shared/pipes/deadline.pipe';
import { TruncatePipe } from '../../../../shared/pipes/truncate.pipe';
import { User } from '../../../users/models/user.model';
import { Priority, Status, Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  imports: [DatePipe,NgClass, TruncatePipe, DeadlinePipe],
  templateUrl: './task-list.html',
})
export class TaskList implements OnInit {
  private userService = inject(UserService);

  tasks = input.required<Task[]>();
  showAssignee = input(true);

  private users = signal<User[]>([]);

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => this.users.set(users));
  }

  assigneeName(id?: number): string {
    if (id === undefined) return 'Non assignée';
    return this.users().find((u) => u.id === id)?.name ?? 'Inconnu';
  }

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