import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedOutToolbarComponent } from './logged-out-toolbar.component';

describe('LoggedOutToolbarComponent', () => {
  let component: LoggedOutToolbarComponent;
  let fixture: ComponentFixture<LoggedOutToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoggedOutToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggedOutToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
