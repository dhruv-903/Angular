import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';
import { EventEmitter } from '@angular/core';
import { responseData } from '../task';

@Component({
  selector: 'app-updatetask',
  templateUrl: './updatetask.component.html',
  styleUrls: ['./updatetask.component.css']
})
export class UpdatetaskComponent implements OnChanges {

  constructor(private taskService: TaskService) { }

  @Input() toggleContainerEvent!: Boolean;
  @Output() updateModalClose = new EventEmitter<Boolean>();

  toggleContainer: Boolean = false;
  closeUpdateModal: Boolean = false;
  myTask: Task = {} as Task;
  private isFirstChange: Boolean = true;
  message!:responseData;

  toggleAddContainer() {
    this.updateModalClose.emit(this.closeUpdateModal);
  }

  taskUpdate(title: string, description: string): void {
    this.myTask.title = title;
    this.myTask.description = description;
    this.taskService.updateTask(this.myTask).subscribe(response=>{this.message = response});
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.message)
    if (this.isFirstChange) {
      this.isFirstChange = false;
      return
    }

    this.toggleContainer = this.toggleContainerEvent
    let myGetObj = this.taskService.getObject();
    this.myTask = myGetObj;
  }

}
