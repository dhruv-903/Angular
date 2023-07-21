import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdatetaskComponent } from './updatetask/updatetask.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'update',component:UpdatetaskComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
