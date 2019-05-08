import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { BacklogItem } from './backlog-item/backlog-item';

@Injectable({
  providedIn: 'root'
})
export class BacklogItemService {
  backlogItems: AngularFirestoreCollection<BacklogItem>;
  backlogItemDoc: AngularFirestoreDocument<BacklogItem>;
  constructor(private firestore: AngularFirestore) {
    this.backlogItems = firestore.collection<BacklogItem>('backlogItems');
  }
  getBacklogItems() {
    return this.firestore.collection('backlogItems').snapshotChanges();
  }
  getBacklogItemById(id: string) {
    return this.firestore.doc<BacklogItem>('backlogItems/' + id).valueChanges();
  }
  createBacklogItem(item) {
    this.backlogItems.add(item);
  }
  updateBacklogItem(item: BacklogItem) {
    delete item.id;
    this.firestore.doc('backlogItems/' + item.id).update(item);
  }
  deleteBacklogItem(id: string) {
    this.firestore.doc('backlogItems/' + id).delete();
  }
}
