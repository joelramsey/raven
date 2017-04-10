/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DendogramComponent } from './dendogram.component';

describe('DendogramComponent', () => {
  let component: DendogramComponent;
  let fixture: ComponentFixture<DendogramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DendogramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DendogramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
