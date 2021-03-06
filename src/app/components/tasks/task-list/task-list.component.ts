﻿import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from "../../../models/task";
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent{


  @Input()
  tasks: Task[];
  
  @Output()
  toggleDone: EventEmitter<Task> = new EventEmitter();

  @Output()
  update: EventEmitter<Task> = new EventEmitter();

  @Output()
  archive: EventEmitter<Task> = new EventEmitter();

  constructor() {
  }

  onToggleTaskDone(task: Task) {
    this.toggleDone.emit(task);
  }
  
  onUpdateTask(task: Task) {
    this.update.emit(task);
  }

  onArchiveTask(task: Task) {
      this.archive.emit(task);
  }
}
