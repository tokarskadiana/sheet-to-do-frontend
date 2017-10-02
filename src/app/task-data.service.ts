﻿import { Injectable } from '@angular/core';
import {Task} from './task';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TaskDataService {

  constructor(private api: ApiService) {
  }

  addTask(task: Task): Observable<Task> {
    return this.api.createTask(task);
  }

  deleteTaskById(taskId: number): Observable<Task>{
    return this.api.deleteTaskById(taskId);
  }

  updateTask(task: Task): Observable<Task> {
    return this.api.updateTask(task);
  }

  getAllTasks(): Observable<Task[]> {
    return this.api.getAllTasks();
  }

  getTaskById(taskId: number): Observable<Task> {
    return this.api.getTaskById(taskId);
  }

  toggleTaskDone(task: Task){
    task.done=!task.done;
    return this.api.updateTask(task);
  }

  archiveTask(task: Task): Observable<Task> {
      task.isArchived = true;
      return this.api.archiveTask(task);
  }
}
