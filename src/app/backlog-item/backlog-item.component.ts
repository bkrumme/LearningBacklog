import { Component, OnInit, Input } from '@angular/core';
import { BacklogItem } from './backlog-item';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { reject } from 'q';
import { BacklogItemService } from '../backlog-item-service';

@Component({
  selector: 'app-backlog-item',
  templateUrl: './backlog-item.component.html',
  styleUrls: ['./backlog-item.component.css']
})
export class BacklogItemComponent implements OnInit {
  newItem: BacklogItem = {id: '', title: '', description: '', category: ''};
  categories = [
    {value: 'discovery', displayValue: 'Discovery'},
    {value: 'explore', displayValue: 'Explore'},
    {value: 'deepDive', displayValue: 'Deep Dive'}
  ];
  newItemForm: FormGroup;
  constructor(private readonly afs: AngularFirestore, fb: FormBuilder, private backlogItemService: BacklogItemService) {
    this.newItemForm = fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required]
    });
   }
addItem() {
  const newItem: BacklogItem = Object.assign({}, this.newItemForm.value);
  this.backlogItemService.createBacklogItem(newItem);
  this.newItemForm.reset();
}
cancel() {
  this.newItemForm.reset();
}
  ngOnInit() {
    console.log(this.categories);
  }
}
