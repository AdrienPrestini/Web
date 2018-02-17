import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementMapComponent } from './management-map.component';

describe('ManagementMapComponent', () => {
  let component: ManagementMapComponent;
  let fixture: ComponentFixture<ManagementMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
