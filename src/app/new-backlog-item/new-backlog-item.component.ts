import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Category } from '../category';
import { CategoryService } from '../category.service';
import { BacklogItemService } from '../backlog-item-service';
import { BacklogItem } from '../backlogItem';

@Component({
  selector: 'app-new-backlog-item',
  templateUrl: './new-backlog-item.component.html',
  styleUrls: ['./new-backlog-item.component.css']
})
export class NewBacklogItemComponent implements OnInit {
  newItemForm: FormGroup;
  categories: Category[];
  selectedCategory: Category;
  newBacklogItem: BacklogItem;
  constructor(private fb: FormBuilder, private categoryService: CategoryService, private backlogItemService: BacklogItemService) {
   }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(cats => {
      this.categories = cats.map(c => {
        return {
          id: c.payload.doc.id,
          ...c.payload.doc.data()
        } as Category;
      });
      console.log(this.categories);
      this.newBacklogItem = new BacklogItem();
      this.newBacklogItem.title = '';
      this.newBacklogItem.description = '';
      this.selectedCategory = this.categories.find(c => c.displayName === 'Explore');
      this.newBacklogItem.category = this.selectedCategory;
      this.newItemForm = this.fb.group({
        title: [this.newBacklogItem.title, Validators.required],
        category: [this.newBacklogItem.category.id, Validators.required],
        description: [this.newBacklogItem.description, Validators.required]
      });
    });
  }
  onCatChange(event: any) {
    this.selectedCategory = this.categories.find(c => c.id === event.target.value);
    this.newBacklogItem.category = this.selectedCategory;
    console.log(this.newItemForm.value);
  }

  add() {
    console.log(this.newItemForm.value);
    const submittedItem = this.newItemForm.value;
    this.newBacklogItem.title = submittedItem.title;
    this.newBacklogItem.description = submittedItem.description;
    this.backlogItemService.createBacklogItem(this.newBacklogItem);
    this.newItemForm.reset();
    console.log(this.newBacklogItem);
  }
}
