import { Task } from '../../models/task';
import { Component, signal } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-task-list',
  imports: [
    FormsModule, 
    CommonModule, 
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
  standalone: true
})
export class TaskListComponent {

  tasks: Task[] = [];
  searchQuery: string = '';
  checked!: boolean;
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
    if (event.checked) {
      this.taskService.markTaskAsCompleted(taskId);
      this.filterTasks();
    } else {
      this.taskService.unMarkTask(taskId);
      this.filterTasks();
    }
  }

  filterTasks(): void {
    this.tasks = this.taskService.filterTasks(this.filterStatusForm);
  }

  onFilterChange(e: string): void {
    this.tasks = this.taskService.filterTasks(this.filterStatusForm);
  }

  searchTasks(): void {
    this.tasks = this.taskService.searchTasks(this.searchQuery);
  }

  markAsCompleted(taskId: number): void {
    this.taskService.markTaskAsCompleted(taskId);
    this.filterTasks();
  }

  deleteTask(taskId: number): void {
    this.tasks = this.taskService.deleteTask(taskId);
  }
}