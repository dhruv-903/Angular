import { Component, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';
import { EventEmitter } from '@angular/core';
import { responseData } from '../task';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddtaskComponent implements OnChanges{
  @Output() taskEvent = new EventEmitter<Task>();
  @Output() reverse = new EventEmitter<Boolean>();
  @Input() hideShowContainer!:Boolean;
 
  constructor(private taskService: TaskService) { };
  toggleContainer:Boolean = false
  myTask: Task = {} as Task;
  myArr: Task[] = [];
  isChecked: boolean = false;
  response!:responseData;
  

  addTask(title: string, description: string) {
    this.myTask.title = title
    this.myTask.description = description
    this.taskService.addTasks(this.myTask).subscribe();
    this.taskEvent.emit(this.myTask);
  }

  toggleAddContainer(){
    this.reverse.emit(this.toggleContainer=false)
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.toggleContainer = this.hideShowContainer
  }

}
