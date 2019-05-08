import { Component, OnInit } from '@angular/core';
import { BacklogItem } from '../backlog-item/backlog-item';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { BacklogItemService } from '../backlog-item-service';
import { defineBase } from '@angular/core/src/render3';


@Component({
  selector: 'app-backlog-item-list',
  templateUrl: './backlog-item-list.component.html',
  styleUrls: ['./backlog-item-list.component.css']
})
export class BacklogItemListComponent implements OnInit {
  constructor(private afs: AngularFirestore, private backlogItemService: BacklogItemService) {
  }
  editMode = false;
  showCreateForm = false;
  backlogItems: BacklogItem[];
  ngOnInit() {
    this.backlogItemService.getBacklogItems().subscribe(data => {
      this.backlogItems = data.map(e => {
        return{
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as BacklogItem;
      });
    });
  }
  edit(item: BacklogItem) {
    this.editMode = !this.editMode;
  }
  cancel() {
    this.editMode = false;
  }
  update(item: BacklogItem) {
    this.editMode = false;
  }
  create() {
    this.showCreateForm = true;
  }
  getBacklogItems() {

  }
}
