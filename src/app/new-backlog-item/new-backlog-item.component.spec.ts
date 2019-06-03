import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBacklogItemComponent } from './new-backlog-item.component';

describe('NewBacklogItemComponent', () => {
  let component: NewBacklogItemComponent;
  let fixture: ComponentFixture<NewBacklogItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewBacklogItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBacklogItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
