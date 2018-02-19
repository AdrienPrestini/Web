import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccidentCommentComponent } from './accident-comment.component';

describe('AccidentCommentComponent', () => {
  let component: AccidentCommentComponent;
  let fixture: ComponentFixture<AccidentCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccidentCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccidentCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
