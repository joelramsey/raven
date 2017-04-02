import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewspaperCitationFormComponent } from './newspaper-citation-form.component';

describe('NewspaperCitationFormComponent', () => {
  let component: NewspaperCitationFormComponent;
  let fixture: ComponentFixture<NewspaperCitationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewspaperCitationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewspaperCitationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
