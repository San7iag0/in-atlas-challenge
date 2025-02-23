import { Task } from '../../models/task';
import { Component, signal } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-task-list',
  imports: [
    FormsModule, 
    CommonModule, 
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
  standalone: true
})
export class TaskListComponent {

  tasks: Task[] = [];
  searchQuery: string = '';
  checked: boolean = false;
  filterStatus: 'all' | 'completed' | 'pending' = 'all';
  filterStatusForm: 'all' | 'completed' | 'pending' = 'all';
  options: string[] = ['all', 'completed', 'pending'];

  protected readonly value = signal('');

  protected onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
  }

  constructor(private taskService: TaskService) {
    this.tasks = this.taskService.getTasks();
  }

  onToggleChange(event: any, taskId: number) {
    console.log('event ', event);
    if (event.checked) {
      this.taskService.markTaskAsCompleted(taskId);
      this.filterTasks();
    } else {
      this.taskService.unMarkTask(taskId);
      this.filterTasks();
    }
  }

  filterTasks(): void {
    console.log(this.filterStatus);
    this.tasks = this.taskService.filterTasks(this.filterStatus);
  }

  onFilterChange(e: string): void {
    console.log('filterStatusForm ', e);
    this.tasks = this.taskService.filterTasks(this.filterStatusForm);
  }

  // Search tasks by title or description
  searchTasks(): void {
    this.tasks = this.taskService.searchTasks(this.searchQuery);
  }

  // Mark a task as completed
  markAsCompleted(taskId: number): void {
    this.taskService.markTaskAsCompleted(taskId);
    this.filterTasks(); // Refresh the list
  }
}