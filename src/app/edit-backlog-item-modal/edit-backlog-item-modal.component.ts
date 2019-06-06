import { Component, OnInit, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BacklogItemService } from '../backlog-item-service';
import { CategoryService } from '../category.service';
import { BacklogItem } from '../backlogItem';
import { Category } from '../category';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-edit-backlog-item-modal',
  templateUrl: './edit-backlog-item-modal.component.html',
  styleUrls: ['./edit-backlog-item-modal.component.css']
})
export class EditBacklogItemModalComponent implements OnInit {
  @Input() backlogItem: BacklogItem;
  @Output() passBackItem: EventEmitter<any> = new EventEmitter();
  editItemForm: FormGroup;
  categories: Category[];
  selectedCategory: Category;

  constructor(public activeModal: NgbActiveModal,
              private fb: FormBuilder,
              private backlogItemService: BacklogItemService,
              private categoryService: CategoryService) {
  }
  update() {
    const updatedItem = this.editItemForm.value;
    updatedItem.category = this.categories.find(c => c.id === updatedItem.category);
    this.backlogItemService.updateBacklogItem(updatedItem).then(ret => {
      this.activeModal.close();
    });
  }
  cancel() {
    this.editItemForm.reset();
    this.activeModal.dismiss();
  }
  ngOnInit() {
    this.categoryService.getCategories().subscribe(cats => {
      this.categories = cats.map(c => {
        return {
          id: c.payload.doc.id,
          ...c.payload.doc.data()
        } as Category;
      });
      this.selectedCategory = this.categories.find(c => c.id === this.backlogItem.category.id);
      this.editItemForm = this.fb.group({
        title: [this.backlogItem.title, [Validators.required]],
        category: [this.selectedCategory.id, [Validators.required]],
        description: [this.backlogItem.description, [Validators.required]],
        id: [this.backlogItem.id]
      });
    });
  }
}
