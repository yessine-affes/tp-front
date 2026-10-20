import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { UserService } from '../../../../core/services/user.service';
import { ProjectService } from '../../../../core/services/project.service';

import { User } from '../../models/user.model';
import { Project } from '../../../projects/models/project.model';

import { UserCard } from '../user-card/user-card';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [FormsModule, UserCard],
  templateUrl: './user-list.html'
})
export class UserList implements OnInit {

  users: User[] = [];
  projects: Project[] = [];
  searchTerm = '';

  constructor(
    private userService: UserService,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {

    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });

    this.projectService.getProjects().subscribe(projects => {
      this.projects = projects;
    });
  }

  get filteredUsers(): User[] {
    const search = this.searchTerm.toLowerCase().trim();

    if (!search) {
      return this.users;
    }

    return this.users.filter(user =>
      user.name.toLowerCase().includes(search) ||
      user.email.toLowerCase().includes(search) ||
      user.role.toLowerCase().includes(search)
    );
  }
}