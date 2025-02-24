import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddTaskComponent } from './component/add-task/add-task.component';
import { TaskListComponent } from './component/task-list/task-list.component';


@Component({
  imports: [ RouterOutlet, AddTaskComponent, TaskListComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  selector: 'app-root',
  standalone: true
})
export class AppComponent {
  constructor() {}
}
