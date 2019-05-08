import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BacklogItemListComponent } from './backlog-item-list/backlog-item-list.component';

const routes: Routes = [
  { path: 'backlogItem-list', component: BacklogItemListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
