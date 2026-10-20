import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../../../core/services/project.service';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';
import { Project } from '../../models/project.model';
import { ProjectCard } from '../project-card/project-card';

@Component({
  selector: 'app-project-list',
  imports: [ProjectCard, FormsModule, EmptyState],
  templateUrl: './project-list.html',
})
export class ProjectList implements OnInit {
  private projectService = inject(ProjectService);

  projects = signal<Project[]>([]);
  searchTerm = signal('');

  filteredProjects = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    return this.projects().filter((p) => p.name.toLowerCase().includes(term));
  });

  ngOnInit(): void {
    this.projectService.getProjects().subscribe((projects) => {
      this.projects.set(projects);
    });
  }

  onProjectSelected(project: Project): void {
    console.log(project);
  }
}