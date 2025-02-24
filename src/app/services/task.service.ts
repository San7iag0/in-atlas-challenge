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

  private loadTasks(): void {
    const tasksJson = localStorage.getItem(this.storageKey);
    if (tasksJson) {
      this.tasks = JSON.parse(tasksJson);
    }
  }

  private saveTasks(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.tasks));
  }

  getTasks(): Task[] {
    return this.tasks;
  }

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

  markTaskAsCompleted(taskId: number): void {
    const task = this.tasks.find((t) => t.id === taskId);
    if (task) {
      task.completed = true;
      this.saveTasks();
    }
  }

  unMarkTask(taskId: number): void {
    const task = this.tasks.find((t) => t.id === taskId);
    if (task) {
      task.completed = false;
      this.saveTasks();
    }
  }

  deleteTask(taskId: number): Task[] {
    const filterObj = this.tasks.filter((task) => task.id !== taskId);
    this.tasks = filterObj;
    this.saveTasks();
    return this.tasks;
  }

  filterTasks(status: 'all' | 'completed' | 'pending'): Task[] {
    if (status === 'completed') {
      return this.tasks.filter((task) => task.completed);
    } else if (status === 'pending') {
      return this.tasks.filter((task) => !task.completed);
    }
    return this.tasks;
  }

  searchTasks(query: string): Task[] {
    return this.tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(query.toLowerCase()) ||
        task.description.toLowerCase().includes(query.toLowerCase())
    );
  }
}
