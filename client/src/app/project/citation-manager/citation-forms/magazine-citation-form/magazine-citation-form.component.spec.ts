import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MagazineCitationFormComponent } from './magazine-citation-form.component';

describe('MagazineCitationFormComponent', () => {
  let component: MagazineCitationFormComponent;
  let fixture: ComponentFixture<MagazineCitationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MagazineCitationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MagazineCitationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
