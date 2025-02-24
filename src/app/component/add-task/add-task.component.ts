import { Component, signal } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-add-task',
  imports: [
    FormsModule, 
    CommonModule,
  
    MatButtonModule, MatDividerModule, MatIconModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule
  ],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss',
  standalone: true
})
export class AddTaskComponent {

  title: string = '';
  description: string = '';
  errorMessage = signal('');

  constructor(
    private taskService: TaskService
  ) {}

  updateErrorMessage(): void {
    this.errorMessage.set('You must enter a value');
  }

  addTask(): void {
    if (this.title.trim()) {
      this.taskService.addTask(this.title, this.description);
      this.title = '';
      this.description = '';
    }
  }
}