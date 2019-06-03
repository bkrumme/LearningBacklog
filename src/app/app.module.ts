import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BacklogItemListComponent } from './backlog-item-list/backlog-item-list.component';
import { BacklogItemService } from './backlog-item-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { EditBacklogItemModalComponent } from './edit-backlog-item-modal/edit-backlog-item-modal.component';
import { NewBacklogItemComponent } from './new-backlog-item/new-backlog-item.component';

@NgModule({
  declarations: [
    AppComponent,
    BacklogItemListComponent,
    EditBacklogItemModalComponent,
    NewBacklogItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireStorageModule,
    AngularFireDatabaseModule
  ],
  providers: [BacklogItemService],
  bootstrap: [AppComponent],
  entryComponents: [EditBacklogItemModalComponent]
})
export class AppModule { }
