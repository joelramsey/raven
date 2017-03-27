import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitationManagerComponent } from './citation-manager.component';

describe('CitationManagerComponent', () => {
  let component: CitationManagerComponent;
  let fixture: ComponentFixture<CitationManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitationManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitationManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
