import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCitationFormComponent } from './book-citation-form.component';

describe('BookCitationFormComponent', () => {
  let component: BookCitationFormComponent;
  let fixture: ComponentFixture<BookCitationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookCitationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookCitationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
