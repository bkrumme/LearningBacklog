import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BacklogItemListComponent } from './backlog-item-list/backlog-item-list.component';
import { BacklogItemComponent } from './backlog-item/backlog-item.component';

const routes: Routes = [
  { path: 'backlogItem-list', component: BacklogItemListComponent },
  { path: 'newBacklogItem', component: BacklogItemComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
