import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditBacklogItemModalComponent } from './edit-backlog-item-modal.component';

describe('EditBacklogItemModalComponent', () => {
  let component: EditBacklogItemModalComponent;
  let fixture: ComponentFixture<EditBacklogItemModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBacklogItemModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBacklogItemModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
