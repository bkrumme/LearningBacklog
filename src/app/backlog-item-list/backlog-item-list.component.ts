import { Component, OnInit } from '@angular/core';
import { BacklogItem } from '../backlogItem';
import { BacklogItemService } from '../backlog-item-service';
import { CategoryService } from '../category.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditBacklogItemModalComponent } from '../edit-backlog-item-modal/edit-backlog-item-modal.component';
import { Category } from '../category';


@Component({
  selector: 'app-backlog-item-list',
  templateUrl: './backlog-item-list.component.html',
  styleUrls: ['./backlog-item-list.component.css']
})
export class BacklogItemListComponent implements OnInit {
  constructor(
    private backlogItemService: BacklogItemService,
    private modalService: NgbModal,
    private categoryService: CategoryService) {
  }
  showCreateForm = false;
  backlogItems: BacklogItem[];
  selectedBacklogItem: BacklogItem;
  categories: Category[];
  ngOnInit() {
    this.backlogItemService.getBacklogItems().subscribe(data => {
        this.categoryService.getCategories().subscribe(cat => {
          this.categories = cat.map( c => {
            return {
              id: c.payload.doc.id,
              ...c.payload.doc.data()
            } as Category;
          });
          this.backlogItems = data.map(d => {
            return {
              id: d.payload.doc.id,
              ...d.payload.doc.data()
            } as BacklogItem;
          });
          this.backlogItems.forEach((bi) => {
            bi.category = this.categories.find((c) => {
              return c.id === bi.category.id;
            });
          });
        });
    });
  }
  select(id: string) {
    this.backlogItemService.getBacklogItemById(id).then(item => {
      this.selectedBacklogItem = {
        id: item.id,
        ...item.data()} as BacklogItem;
      const modalRef = this.modalService.open(EditBacklogItemModalComponent);
      modalRef.componentInstance.backlogItem = this.selectedBacklogItem;
    });
  }
}
