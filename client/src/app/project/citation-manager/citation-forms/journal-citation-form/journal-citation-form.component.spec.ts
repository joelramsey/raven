import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalCitationFormComponent } from './journal-citation-form.component';

describe('JournalCitationFormComponent', () => {
  let component: JournalCitationFormComponent;
  let fixture: ComponentFixture<JournalCitationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JournalCitationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalCitationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
