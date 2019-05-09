import { Component, OnInit } from '@angular/core';
import { BacklogItem } from '../backlog-item/backlog-item';
import { BacklogItemService } from '../backlog-item-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-backlog-item-list',
  templateUrl: './backlog-item-list.component.html',
  styleUrls: ['./backlog-item-list.component.css']
})
export class BacklogItemListComponent implements OnInit {
  editItemForm: FormGroup;
  constructor(private backlogItemService: BacklogItemService, private fb: FormBuilder) {
  }
  editMode = false;
  showCreateForm = false;
  backlogItems: BacklogItem[];
  selectedBacklogItem: BacklogItem;
  categories = [
    {value: 'discovery', displayValue: 'Discovery'},
    {value: 'explore', displayValue: 'Explore'},
    {value: 'deepDive', displayValue: 'Deep Dive'}
  ];
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
  cancel() {
    this.editMode = false;
    this.editItemForm.reset();
  }
  update() {
    this.editMode = false;
    this.backlogItemService.updateBacklogItem(this.editItemForm.value);
  }
  select(id: string) {
    this.backlogItemService.getBacklogItemById(id).subscribe(data => {
      this.selectedBacklogItem = data;
      this.editItemForm = this.fb.group({
        title: [data.title, Validators.required],
        category: [data.category, Validators.required],
        description: [data.description, Validators.required]
      });
      this.editMode = !this.editMode;
    });
  }
}
