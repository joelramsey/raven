import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteCitationFormComponent } from './website-citation-form.component';

describe('WebsiteCitationFormComponent', () => {
  let component: WebsiteCitationFormComponent;
  let fixture: ComponentFixture<WebsiteCitationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebsiteCitationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsiteCitationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
