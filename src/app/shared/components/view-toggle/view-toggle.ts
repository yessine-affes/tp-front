import { Component, model } from '@angular/core';

export type ViewMode = 'task' | 'user';

@Component({
  selector: 'app-view-toggle',
  templateUrl: './view-toggle.html',
})
export class ViewToggle {
  view = model.required<ViewMode>();

  options: { value: ViewMode; label: string }[] = [
    { value: 'task', label: 'Par tâche' },
    { value: 'user', label: 'Par user' },
  ];
}