﻿import { Injectable } from '@angular/core';
import {Task} from '../models/task';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { Http, Response } from '@angular/http';
import {TaskCategoryCustom} from '../models/task-category-custom';
import {TaskCategoryDate} from '../models/task-category-date';
import {TaskCategory} from '../interfaces/task-category';

const API_URL = environment.apiUrl;

@Injectable()
export class TaskDataService extends ApiService {

  getTasksByCategory(taskCategory: TaskCategory): Observable<Task[]> {
    switch (taskCategory.getType()) {
      case 'TaskCategoryAll': {
        return this.getAllTasks();
      }
      case 'TaskCategoryDate': {
        return this.getTasksByDateCategory(<TaskCategoryDate>taskCategory);
      }
      case 'TaskCategoryCustom': {
        return this.getTasksByCustomCategory(<TaskCategoryCustom>taskCategory);
      }
    }
  }

  // API: GET /tasks
  private getAllTasks(): Observable<Task[]> {
    return this.http.get(`${API_URL}tasks?userId=1`)
      .map(response => {
        const tasks = response.json();
        return tasks.map((task) => new Task(task));
      })
      .catch(this.handleError);
  }

  // API: GET /tasks?taskCategoryId=
  private getTasksByCustomCategory(taskCategory: TaskCategoryCustom): Observable<Task[]> {
    return this.http.get(`${API_URL}tasks?taskCategoryId=${taskCategory.taskCategoryId}`)
      .map(response => response.json() as Task[])
      .catch(this.handleError);
  }

  // API: GET /tasks?userId= &startDate= &endDate=
  private getTasksByDateCategory(taskCategory: TaskCategoryDate): Observable<Task[]> {
    return this.http.get(`${API_URL}tasks?userId=1&startDate=${taskCategory.startDate}&endDate=${taskCategory.endDate}`)
      .map(response => response.json() as Task[])
      .catch(this.handleError);
  }

  // API: GET /tasks/:id
  getTaskById(taskId: number): Observable<Task> {
    return this.http
    .get(API_URL + 'tasks/' + taskId)
    .map(response => {
      return new Task(response.json());
    })
    .catch(this.handleError);
  }

  // API: POST /tasks
  addTask(task: Task): Observable<Task> {
    return this.http
    .post(API_URL + 'tasks?userId=1', task)
    .map(response => {
      return new Task(response.json());
    })
    .catch(this.handleError);
  }

   // API: PUT /tasks/:id
  updateTask(task: Task): Observable<Task> {
    return this.http
    .put(API_URL + 'tasks/' + task.taskId, task)
    .map(response => {
      return new Task(response.json());
    })
    .catch(this.handleError);
  }

  // API: PATCH /tasks/:id
  toggleTaskDone(task: Task) {
    task.done = !task.done;
    return this.http
    .patch(API_URL + 'tasks/' + task.taskId, [{ op: 'replace', path: 'Done', value: task.done }])
    .map(response => null)
    .catch(this.handleError);
  }

  // API: PATCH /tasks/:id
  archiveTask(task: Task): Observable<Task> {
      task.isArchived = true;
      return this.http
      .patch(API_URL + 'tasks/' + task.taskId, [{ op: 'replace', path: 'isArchived', value: true }])
      .map(response => null)
      .catch(this.handleError);
  }
}
