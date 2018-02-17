import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementBarComponent } from './management-bar.component';

describe('ManagementBarComponent', () => {
  let component: ManagementBarComponent;
  let fixture: ComponentFixture<ManagementBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
