import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementTableComponent } from './management-table.component';

describe('ManagementTableComponent', () => {
  let component: ManagementTableComponent;
  let fixture: ComponentFixture<ManagementTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
