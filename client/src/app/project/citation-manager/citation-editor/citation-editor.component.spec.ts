import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitationEditorComponent } from './citation-editor.component';

describe('CitationEditorComponent', () => {
  let component: CitationEditorComponent;
  let fixture: ComponentFixture<CitationEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitationEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitationEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
