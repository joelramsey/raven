import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterCitationFormComponent } from './chapter-citation-form.component';

describe('ChapterCitationFormComponent', () => {
  let component: ChapterCitationFormComponent;
  let fixture: ComponentFixture<ChapterCitationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChapterCitationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChapterCitationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
