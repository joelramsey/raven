import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributorFormComponent } from './contributor-form.component';

describe('ContributorFormComponent', () => {
  let component: ContributorFormComponent;
  let fixture: ComponentFixture<ContributorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContributorFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContributorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
