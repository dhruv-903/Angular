import { Component, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  addTaskContainer: Boolean = false;

  addTaskShow(event:any) {
    this.addTaskContainer = true;
  }

  toggleAddContainer(event:Boolean){
    this.addTaskContainer = event;
  }

}
