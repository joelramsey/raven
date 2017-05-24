import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyPageComponent } from './body-page.component';

describe('BodyPageComponent', () => {
  let component: BodyPageComponent;
  let fixture: ComponentFixture<BodyPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodyPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
