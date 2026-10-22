import { Component, OnInit, inject, input, signal } from '@angular/core';

import { UserService } from '../../../../core/services/user.service';
import { User } from '../../../users/models/user.model';
import { Task } from '../../models/task.model';
import { TaskItem } from '../task-item/task-item';

@Component({
  selector: 'app-task-list',
  imports: [TaskItem],
  templateUrl: './task-list.html',
})
export class TaskList implements OnInit {
  private userService = inject(UserService);
  private users = signal<User[]>([]);

  tasks = input.required<Task[]>();
  showAssignee = input(true);

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users.set(users);
    });
  }

  assigneeName(id?: number): string {
    if (id === undefined) {
      return 'Non assignée';
    }

    return this.users().find((user) => user.id === id)?.name ?? 'Inconnu';
  }
}