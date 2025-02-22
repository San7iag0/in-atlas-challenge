import { Task } from '../../models/task';
import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  imports: [],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {

  tasks: Task[] = [];
  filterStatus: 'all' | 'completed' | 'pending' = 'all';
  searchQuery: string = '';

  constructor(private taskService: TaskService) {
    this.tasks = this.taskService.getTasks();
  }

  // Filter tasks by status
  filterTasks(): void {
    this.tasks = this.taskService.filterTasks(this.filterStatus);
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