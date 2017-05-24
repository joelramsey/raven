import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectStarterDialogComponent } from './project-starter-dialog.component';

describe('ProjectStarterDialogComponent', () => {
  let component: ProjectStarterDialogComponent;
  let fixture: ComponentFixture<ProjectStarterDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectStarterDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectStarterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
