import { Injectable } from '@angular/core';
import { Task } from './task';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { responseData } from './task';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  headers = new HttpHeaders().set('userDetails', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRocnV2QGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiRGhydXYiLCJpZCI6IjY0YjY4MTI1OGQzOWE3NDUyMGY0N2RmOCIsImlhdCI6MTY4OTY4MjIxM30.B7l1lgUUAwF-mqf-GTFrzg_r4YJyl3OScLBhVlvfJjw');

  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  mySetObj!: Task;

  getObject(): Task {
    return this.mySetObj;
  }

  setObject(task: Task) {
    this.mySetObj = task;
  }

  private taskUrl = 'http://localhost:3000/task/add-task'
  addTasks(task: Task): Observable<Task> {
    return this.http.post<Task>(this.taskUrl, task);
  }

  private getTaskUrl = 'http://localhost:3000/task/get-tasks'
  getTasks(): Observable<{ data: Task[] }> {
    return this.http.get<{ data: Task[] }>(this.getTaskUrl, { headers: this.headers });
  }

  private deleteTaskUrl = "http://localhost:3000/task/delete-task"
  deleteTask(task: Task): Observable<Task> {
    let id = task._id;
    const url = `${this.deleteTaskUrl}/${id}`;
    alert(`Your task ${id} has been deleted`)
    return this.http.delete<Task>(url, { headers: this.headers })
  }

  private updateTaskUrl = "http://localhost:3000/task/update-task"
  updateTask(task: Task): Observable<responseData> {
    let id = task._id;
    const url = `${this.updateTaskUrl}/${id}`;
    return this.http.patch<responseData>(url, task, { headers: this.headers })
  }

}
