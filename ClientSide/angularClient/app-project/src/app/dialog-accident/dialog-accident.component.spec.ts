import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAccidentComponent } from './dialog-accident.component';

describe('DialogAccidentComponent', () => {
  let component: DialogAccidentComponent;
  let fixture: ComponentFixture<DialogAccidentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAccidentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAccidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
