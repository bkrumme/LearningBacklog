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
  ngOnInit() {
    this.backlogItemService.getBacklogItems().subscribe(data => {
        this.categoryService.getCategories().subscribe(cat => {
          const categories = cat.map( c => {
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
          console.log(this.backlogItems);
          this.backlogItems.forEach((bi) => {
            bi.category = categories.find((c) => {
              return c.id === bi.category.id;
            });
          });
        });
    });
  }
  select(id: string) {
    this.backlogItemService.getBacklogItems().subscribe(data => {
      const items = data.map(i => {
        return {
          id: i.payload.doc.id,
          ...i.payload.doc.data()
        } as BacklogItem;
      });
      this.selectedBacklogItem = items.find(bi => {
        return bi.id === id;
      });
      console.log(this.selectedBacklogItem);
      const modalRef = this.modalService.open(EditBacklogItemModalComponent);
      modalRef.componentInstance.backlogItem = this.selectedBacklogItem;
    });
  }
}
