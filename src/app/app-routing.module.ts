import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BacklogItemListComponent } from './backlog-item-list/backlog-item-list.component';
import { NewBacklogItemComponent } from './new-backlog-item/new-backlog-item.component';

const routes: Routes = [
  { path: 'backlogItem-list', component: BacklogItemListComponent },
  { path: 'new-backlog-item', component: NewBacklogItemComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
