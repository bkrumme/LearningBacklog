import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BacklogItemService } from '../backlog-item-service';
import { CategoryService } from '../category.service';
import { BacklogItem } from '../backlogItem';
import { Category } from '../category';

@Component({
  selector: 'app-edit-backlog-item-modal',
  templateUrl: './edit-backlog-item-modal.component.html',
  styleUrls: ['./edit-backlog-item-modal.component.css']
})
export class EditBacklogItemModalComponent implements OnInit {
  @Input() backlogItem: BacklogItem;
  editItemForm: FormGroup;
  categories: Category[];
  selectedCategory: Category;

  constructor(public activeModal: NgbActiveModal,
              private fb: FormBuilder,
              private backlogItemService: BacklogItemService,
              private categoryService: CategoryService) {
  }
  update() {
    console.log(this.backlogItem);
    this.backlogItemService.updateBacklogItem(this.backlogItem);
    this.activeModal.close();
  }
  onCatChange(event: any) {
    this.selectedCategory = this.categories.find(c => c.id === event.target.value);
    this.backlogItem.category = this.selectedCategory;
    console.log(this.selectedCategory);
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
        categories: [null, [Validators.required]],
        description: [this.backlogItem.description, [Validators.required]]
      });
      this.editItemForm.get('categories').setValue(this.selectedCategory.id);
    });
  }
}
