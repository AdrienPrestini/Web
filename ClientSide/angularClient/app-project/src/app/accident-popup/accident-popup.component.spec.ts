import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccidentPopupComponent } from './accident-popup.component';

describe('AccidentPopupComponent', () => {
  let component: AccidentPopupComponent;
  let fixture: ComponentFixture<AccidentPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccidentPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccidentPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
