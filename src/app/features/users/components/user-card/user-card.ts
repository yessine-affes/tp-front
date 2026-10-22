import { LowerCasePipe, NgClass, TitleCasePipe , NgStyle,} from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';
import { InitialsPipe } from '../../../../shared/pipes/initials.pipe';
import { Project } from '../../../projects/models/project.model';
import { Status, Task } from '../../../projects/models/task.model';
import { User } from '../../models/user.model';
import { UserProjectGroup } from '../user-project-group/user-project-group';
import { HighlightDirective } from '../../../../shared/directives/highlight.directive';

interface ProjectTasks {
  project: Project;
  tasks: Task[];
}

@Component({
  selector: 'app-user-card',
  imports: [UserProjectGroup, EmptyState, TitleCasePipe, LowerCasePipe, InitialsPipe,NgClass, NgStyle,HighlightDirective],
  templateUrl: './user-card.html',
})
export class UserCard {
  user = input.required<User>();
  projects = input.required<Project[]>();
  readonly roleColors: Record<string, string> = {
  'Admin': '#7c3aed',
  'Développeur': '#2563eb',
  'Designer': '#db2777',
};

  groups = computed<ProjectTasks[]>(() =>
    this.projects()
      .map((project) => ({
        project,
        tasks: project.tasks.filter((t) => t.assigneeId === this.user().id),
      }))
      .filter((group) => group.tasks.length > 0),
  );

  private allTasks = computed(() => this.groups().flatMap((g) => g.tasks));

  todoCount = computed(() => this.countByStatus('En attente'));
  inProgressCount = computed(() => this.countByStatus('En cours'));
  doneCount = computed(() => this.countByStatus('Terminé'));

  private countByStatus(status: Status): number {
    return this.allTasks().filter((t) => t.status === status).length;
  }
  
}