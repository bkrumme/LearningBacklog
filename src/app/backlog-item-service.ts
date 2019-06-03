import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { BacklogItem } from './backlogItem';
import { combineLatest, defer, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class BacklogItemService {
  backlogItemsRef: AngularFirestoreCollection<BacklogItem>;
  backlogItemsCollection: BacklogItem[];
  backlogItemDoc: AngularFirestoreDocument<BacklogItem>;
  constructor(private fs: AngularFirestore) {
    this.backlogItemsRef = fs.collection<BacklogItem>('backlogItems');
  }
  getBacklogItems() {
    return this.backlogItemsRef.snapshotChanges();
  }
  getBacklogItemById(id: string) {
    return this.fs.doc<BacklogItem>('backlogItems/' + id).snapshotChanges();
  }
  createBacklogItem(item) {
    this.backlogItemsRef.add(item);
  }
  updateBacklogItem(item: BacklogItem) {
    this.fs.doc('backlogItems/' + item.id).update(item);
  }
  deleteBacklogItem(id: string) {
    this.fs.doc('backlogItems/' + id).delete();
  }
}
