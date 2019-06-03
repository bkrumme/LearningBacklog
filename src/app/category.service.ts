import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Category } from './category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private fs: AngularFirestore) {
   }
   getCategories() {
     return this.fs.collection('categories').snapshotChanges();
   }
   getCategoryById(id: string) {
     return this.fs.doc<Category>('categories/' + id).snapshotChanges();
   }
}
