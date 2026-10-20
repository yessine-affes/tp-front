import { Component, signal } from '@angular/core';
import { ProjectList } from './features/projects/components/project-list/project-list';
import { UserList } from './features/users/components/user-list/user-list';
import { ViewMode, ViewToggle } from './shared/components/view-toggle/view-toggle';

@Component({
  selector: 'app-root',
  imports: [ProjectList, UserList, ViewToggle],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  view = signal<ViewMode>('task');
}