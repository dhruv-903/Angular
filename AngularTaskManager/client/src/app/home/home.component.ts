import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Input() toggleEvent!: Boolean
  @Output() reverse = new EventEmitter<Boolean>();

  constructor(private taskService: TaskService) { }
  myTaskArr: Task[] = [];
  updateModal: Boolean = false;

  toggleAddContainer(value: Boolean) {
    this.reverse.emit(value)
  }

  closeUpdateModal(value: Boolean) {
    this.updateModal = value;
  }

  deleteFunction(i: number): void {
    let myTask = this.myTaskArr[i];
    this.taskService.deleteTask(myTask).subscribe();
    this.myTaskArr.splice(i, 1);
  }

  taskDone(i: number) {
    if (this.myTaskArr[i].status === true) {
      this.myTaskArr[i].status = false;
    }
    else {
      this.myTaskArr[i].status = true;
    }
  }

  myUpdateRoute(i: number) {
    let myArrayElement = this.myTaskArr[i];
    this.taskService.setObject(myArrayElement);
    this.updateModal = true
  }

  receiveTask(task: Task) {
    this.myTaskArr.push(task);
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe((tasks: { data: Task[] }) => {
      this.myTaskArr = tasks.data
    })
  }

  ngOnInit(): void {
    this.getTasks();
  }


}
