import { Injectable } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  
  private tasks: Task[] = [];
  private readonly storageKey = 'tasks';

  constructor() {
    this.loadTasks();
  }

  // Load tasks from LocalStorage
  private loadTasks(): void {
    const tasksJson = localStorage.getItem(this.storageKey);
    if (tasksJson) {
      this.tasks = JSON.parse(tasksJson);
    }
  }

  // Save tasks to LocalStorage
  private saveTasks(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.tasks));
  }

  // Get all tasks
  getTasks(): Task[] {
    return this.tasks;
  }

  // Add a new task
  addTask(title: string, description: string): void {
    const newTask: Task = {
      id: Date.now(),
      title,
      description,
      completed: false,
    };
    this.tasks.push(newTask);
    this.saveTasks();
  }

  // Mark a task as completed
  markTaskAsCompleted(taskId: number): void {
    const task = this.tasks.find((t) => t.id === taskId);
    if (task) {
      task.completed = true;
      this.saveTasks();
    }
  }

  // Filter tasks by status
  filterTasks(status: 'all' | 'completed' | 'pending'): Task[] {
    if (status === 'completed') {
      return this.tasks.filter((task) => task.completed);
    } else if (status === 'pending') {
      return this.tasks.filter((task) => !task.completed);
    }
    return this.tasks;
  }

  // Search tasks by title or description
  searchTasks(query: string): Task[] {
    return this.tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(query.toLowerCase()) ||
        task.description.toLowerCase().includes(query.toLowerCase())
    );
  }
}